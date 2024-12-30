import express from 'express';
import { createValidator } from 'express-joi-validation';
import { trycatch } from '../middlewares/tryCatch';
import { login } from '../controllers/candidate/authController';
import { candidateLoginValidation } from '../middlewares/validation/candidate/authValidation';
const router=express.Router();
const validator=createValidator({passError:true});
router.post('/login',validator.body(candidateLoginValidation),trycatch(login))
export default router;