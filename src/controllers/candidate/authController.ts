import { Request, Response } from "express";
import AppError from "../../middlewares/AppError";
import Candidate from "../../models/candidate/candidateSchema";
import { generateToken } from "../../utils/jwt";

export const login=async(req:Request,res:Response)=>{
    const {email,password}=req.body;
    const candidate=await Candidate.findOne({email,password,isDeleted:false})
    if(!candidate)
        {
            throw new AppError(`no candidate found ,please create an account`,404)
        }
    const token=generateToken(candidate.id)
     res.status(200).json({success:true,message:`welcome candidate`,data:candidate,token })

}