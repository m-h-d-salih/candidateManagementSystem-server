import { Request, Response } from "express";
import AppError from "../../middlewares/AppError";
import Candidate from "../../models/candidate/candidateSchema";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
interface Candidate{
  name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    isDeleted: boolean;
    profileUrl?: string | null | undefined;
    resume?: string  | undefined;
    createdAt?: Date | undefined;
}

export const uploadProfileImage=async(req:Request,res:Response)=>{
  const {id}=req.params;
    if (!req.file) {
        throw new AppError('please provide image',401);
      }
      const s3Client = new S3Client({ region: process.env.AWS_REGION });
    const file = req.file as Express.MulterS3.File;
    const imageURL = file.location;
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      throw new AppError('Candidate not found', 404);
    }
    if (candidate.profileUrl) {
      const oldImageKey = candidate.profileUrl.split('/').pop(); 
      if (oldImageKey) {
        const deleteParams = {
          Bucket: process.env.S3_BUCKET_NAME, 
          Key: oldImageKey,
        };
        await s3Client.send(new DeleteObjectCommand(deleteParams));
      }
    }
    
    candidate.profileUrl = imageURL;
    await candidate.save();
    res.status(200).json({
      message: 'Profile image uploaded successfully',
      data: candidate,
    });
}
export const uploadResume=async(req:Request,res:Response)=>{
  const {id}=req.params;
    if (!req.file) {
        throw new AppError('please provide Resume',401);
      }
      const s3Client = new S3Client({ region: process.env.AWS_REGION });
    const file = req.file as Express.MulterS3.File;
    const resume = file.location;
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      throw new AppError('Candidate not found', 404);
    }
    if (candidate.resume) {
      const oldResumeKey = candidate.resume.split('/').pop();
      if (oldResumeKey) {
        const deleteParams = {
          Bucket: process.env.S3_BUCKET_NAME, 
          Key: oldResumeKey,
        };
        await s3Client.send(new DeleteObjectCommand(deleteParams));
      }
    }
    
    candidate.resume = resume;
    await candidate.save();
    res.status(200).json({
      message: 'Profile image uploaded successfully',
      data: candidate,
    });
}