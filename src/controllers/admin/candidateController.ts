import { Request, Response } from "express";
import Candidate from "../../models/candidate/candidateSchema";
import AppError from "../../middlewares/AppError";

export const createCandidate=async(req:Request,res:Response)=>{
   const {name,email,password,phone}=req.body;
   const existCandidate=await Candidate.findOne({email});
   if(existCandidate)
    throw new AppError(`Candidate already exist`,400)
   const candidate=new Candidate({
    name,
    email,
    password,
    phone
})
await candidate.save()
res.status(201).json({
    success: true,
    message: "Candidate created Successfully",
    data: candidate,
  });
}
