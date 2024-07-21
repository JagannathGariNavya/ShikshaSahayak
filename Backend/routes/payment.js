import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';
import Customer from "../Models/Loginmodel.js"

const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// ROUTE: Create Payment Order
router.post('/order', async (req, res) => {
    const { amount,  _id } = req.body;
    req.user["donatee_id"] = _id;
    try {
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: '1' 
        };

        const order = await razorpayInstance.orders.create(options);
        res.json({ data: order });
    } catch (error) {
        res.status(500).json({ message: "Error creating payment order" });
        console.log(error);
    }
});


router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donor_name, donation_id, amount } = req.body;

    try {
        console.log('Incoming verification data:', req.body); // Log incoming data

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {
            const donation = await Customer.findById(donation_id);
            if (donation) {
                donation.current_amount += amount;
                donation.total_amount_gathered += amount;
                donation.current_donators.push({
                    donor_name,
                    amount,
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                    donation_date: new Date()
                });
                await donation.save();

                console.log('Donation updated successfully:', donation); // Log successful update
                let data;
                if(req.user.donatee_id.length == 24)data = await Customer.aggregate([{$match:{'_id':new mongoose.Types.ObjectId(req.user.donatee_id.length)}},{$project:{"student_password":0, "student_email":0}}]);
                else data = await Customer.aggregate([{$match:{'_id':Number(req.user.donatee_id.length)}},{$project:{"student_password":0, "student_email":0}}]);
                
                data = data[0];

                let user_name;
                if(req.user.id.length == 24)user_name = await Customer.aggregate([{$match:{'_id':new mongoose.Types.ObjectId(req.user.id)}},{$project:{"student_name":1}}]);
                else user_name = await Customer.aggregate([{$match:{'_id':Number(req.user.id)}},{$project:{"student_name":1}}]);

                user_name = user_name[0];

                if(req.user.donatee_id.length == 24) await Customer.updateOne({'_id':new mongoose.Types.ObjectId(req.user.donatee_id)},{$set:{total_amount:data.total_amount+amount, current_amount:data.current_amount+amount, current_donators:[...data.current_donators,{_id:data.current_donators.length+1,donator_id:res.user.id,name:user_name.student_name,amount:amount}]}});
                else  await Customer.updateOne({'_id':Number(req.user.donatee_id)},{$set:{total_amount:data.total_amount+amount, current_amount:data.current_amount+amount, current_donators:[...data.current_donators,{_id:data.current_donators.length+1,donator_id:res.user.id,name:user_name.student_name,amount:amount}]}});

                res.json({ message: "Payment Successfully" });
            } else {
                console.log('Donation not found for ID:', donation_id); // Log missing donation
                res.status(404).json({ message: "Donation not found" });
            }
        } else {
            console.log('Invalid signature:', { expectedSign, receivedSignature: razorpay_signature }); // Log invalid signature
            res.status(400).json({ message: "Invalid signature" });
        }
    } catch (error) {
        console.error('Error during payment verification:', error); // Log caught errors
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

export default router;
