const {Schema, model} = require("mongoose");

const student_schema = new Schema({
    student_name:{type:String, require:true},
    student_email:{type:String, require:true},
    student_password:{type:String, require:true},
    student_age:{type:Number, require:true},
    role:{type:String,enum:["user", "admin"], default:"user"},
    donation_title:{type:String},
    donation_description:{type:String},
    updates_on_donation:{type:[String]},
    media_images:{type:[String]},
    time_of_creation:{type:Date},
    donation_deadline:{type:Date},
    total_amount_gathered:{type:Number},
    goal_amount:{type:Number},
    current_amount:{type:Number},
    donation_active_status:{type:Boolean},
    current_donators:{type:[Object]},
    comments:{type:[Object]}
});

const userModel = model("user", userSchema);
module.exports = userModel;