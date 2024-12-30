import express from 'express';
import { createValidator } from 'express-joi-validation'
import { adminLoginValidation, adminRegitserValidation } from '../middlewares/validation/admin/authValidation';
import { trycatch } from '../middlewares/tryCatch';
import { login, signup } from '../controllers/admin/authController';
import { createCandidate } from '../controllers/admin/candidateController';
import { candidateCreateValidation } from '../middlewares/validation/admin/candidateValidation';
import checkAuth from '../middlewares/checkAuth';
import { checkAdmin } from '../middlewares/checkAdmin';

const adminRouter=express.Router();
const validator=createValidator({passError:true})

adminRouter.post(`/signup`,validator.body(adminRegitserValidation),trycatch(signup));
adminRouter.post(`/login`,validator.body(adminLoginValidation),trycatch(login));
adminRouter.post(`/candidate`,checkAuth,checkAdmin,validator.body(candidateCreateValidation),trycatch(createCandidate));

export default adminRouter;