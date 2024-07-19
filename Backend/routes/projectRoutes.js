import express from "express";
import Customer from "../Models/Loginmodel.js";
const projectRoutes = express.Router();


projectRoutes.get("/", async(req,res)=>{
    try{
        // const data = await studentModel.find();
        // const data = await Customer.aggregate([{$match:{...req.query}},{$project:{"student_password":0, "student_email":0}}]);
        // res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})
export default projectRoutes;