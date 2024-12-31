import express from 'express';
import { createValidator } from 'express-joi-validation';
import { trycatch } from '../middlewares/tryCatch';
import { login } from '../controllers/candidate/authController';
import { candidateLoginValidation } from '../middlewares/validation/candidate/authValidation';
import uploadImage from '../middlewares/uploadFile';
import { uploadProfileImage } from '../controllers/candidate/profileController';
import checkAuth from '../middlewares/checkAuth';
const router=express.Router();
const validator=createValidator({passError:true});
router.post('/login',validator.body(candidateLoginValidation),trycatch(login))
router.put('/upload/:id',checkAuth,uploadImage.single('image'),trycatch(uploadProfileImage))
router.put('/uploadResume/:id',checkAuth,uploadImage.single('file'),trycatch(uploadProfileImage))
export default router;