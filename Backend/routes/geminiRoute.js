import Router from "express";
import run from "../utils/geminiApi.js";
const router=Router();
router.post('/prompt',async(req,res)=>{
    try{
        const  {prompt}=req.body
        const response=await run(prompt)
        res.json(response);

    }catch(error){
        console.log(error)
    }
})
export default router;