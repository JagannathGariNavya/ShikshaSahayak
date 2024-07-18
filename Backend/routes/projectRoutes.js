const { Router } = require("express");
const studentModel = require("../Models/students_schema");
const projectRoutes = Router();


projectRoutes.get("/", async(req,res)=>{
    try{
        // const data = await studentModel.find();
        const data = await studentModel.aggregate([{$match:{...req.query}},{$project:{"student_password":0, "student_email":0}}]);
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})
module.exports = projectRoutes;