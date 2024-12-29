import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";
import Admin from "../models/admin/adminSchema";

export const checkAdmin=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const id=req.params.id;
        if (!id) {
            throw new AppError("Please provide an admin ID.", 401);
          }
        const admin = await Admin.findById(id);
        if (!admin) {
            throw new AppError("Access denied. Admin privileges required.", 403);
          }
          next();
    }catch(error:any){
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal server error",
          });
    }

}