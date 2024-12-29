import { Request, Response } from "express";
import AppError from "../../middlewares/AppError";
import Admin from "../../models/admin/adminSchema";
import { comparepassword, hashPassword } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";


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


export const login=async(req:Request,res:Response)=>{
        const {email,password}=req.body;
        const admin=await Admin.findOne({email})
        if(!admin)
            {
                throw new AppError(`no admin found ,please create an account`,404)
            }
                
        const validateAdmin=await comparepassword(password,admin.password)
        if(!validateAdmin) return res.status(404).json({success:false,message:`inncorrect username/password `})
        const token=generateToken(admin.id)
         res.status(200).json({success:true,message:`welcome admin`,data:admin,token })

}
