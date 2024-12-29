import { Request, Response } from "express";
import Admin from "../../../models/admin/adminSchema";
import AppError from "../../../middlewares/AppError";
import { hashPassword } from "../../../utils/bcrypt";

export const signup=async(req:Request,res:Response)=>{
    const {name,email,password}=req.body;
    const existadmin=await Admin.findOne({email});
    if(existadmin)
        throw new AppError(`admin already exist`,400);
    const hashedPassword = await hashPassword(password);
    const admin=new Admin({
        name,
        email,
        password:hashedPassword,
    })
    await admin.save()
    res.status(201).json({
        success: true,
        message: "Admin Registered Successfully",
        data: admin,
      });
}