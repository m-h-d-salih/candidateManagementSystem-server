import express from 'express';
import { createValidator } from 'express-joi-validation'
import { adminRegitserValidation } from '../middlewares/validation/admin/signupValidation';
import { trycatch } from '../middlewares/tryCatch';
import { signup } from '../controllers/admin/authController/signup';

const adminRouter=express.Router();
const validator=createValidator({passError:true})

adminRouter.post(`/admin/signup`,validator.body(adminRegitserValidation),trycatch(signup));

export default adminRouter;