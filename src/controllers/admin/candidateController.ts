import { Request, Response } from "express";
import Candidate from "../../models/candidate/candidateSchema";
import AppError from "../../middlewares/AppError";

export const createCandidate=async(req:Request,res:Response)=>{
   const {name,email,password,phone,address}=req.body;
   const existCandidate=await Candidate.findOne({email,isDeleted:false});
   if(existCandidate)
    throw new AppError(`Candidate already exist`,400)
   const candidate=new Candidate({
    name,
    email,
    password,
    phone,
    address
})
await candidate.save()
res.status(201).json({
    success: true,
    message: "Candidate created Successfully",
    data: candidate,
  });
}
export const getAllCandidates = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const candidates = await Candidate.find()
  .skip(skip)      
  .limit(limit);

  if (candidates.length === 0) {
    throw new AppError("No candidates found", 404);
  }
  const totalCandidates = await Candidate.countDocuments();
  res.status(200).json({
    success: true,
    message: "Candidates retrieved successfully",
    data: {candidates,totalCandidates},
  });
};


export const deleteCandidate = async (req: Request, res: Response) => {
const { id } = req.params;
const deletedCandidate = await Candidate.findByIdAndUpdate(
  id,
  { isDeleted: true },
  { new: true } 
);

  if (!deletedCandidate) {
    throw new AppError(`Candidate with ID ${id} not found`,404);
  }
  res.status(200).json({
    success: true,
    message: "Candidate deleted successfully",
  });
}