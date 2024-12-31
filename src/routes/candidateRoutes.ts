import express from 'express';
import { createValidator } from 'express-joi-validation';
import { trycatch } from '../middlewares/tryCatch';
import { login } from '../controllers/candidate/authController';
import { candidateLoginValidation } from '../middlewares/validation/candidate/authValidation';
import uploadImage from '../middlewares/uploadImage';
import { uploadProfileImage } from '../controllers/candidate/profileController';
const router=express.Router();
const validator=createValidator({passError:true});
router.post('/login',validator.body(candidateLoginValidation),trycatch(login))
router.put('/upload/:id',uploadImage.single('image'),trycatch(uploadProfileImage))
export default router;