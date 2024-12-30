import express from 'express';
import { createValidator } from 'express-joi-validation'
import { adminLoginValidation, adminRegitserValidation } from '../middlewares/validation/admin/authValidation';
import { trycatch } from '../middlewares/tryCatch';
import { login, signup } from '../controllers/admin/authController';
import { createCandidate, deleteCandidate, getACandidate, getAllCandidates } from '../controllers/admin/candidateController';
import { candidateCreateValidation } from '../middlewares/validation/admin/candidateValidation';
import checkAuth from '../middlewares/checkAuth';
import { checkAdmin } from '../middlewares/checkAdmin';

const router=express.Router();
const validator=createValidator({passError:true})

router.post(`/signup`,validator.body(adminRegitserValidation),trycatch(signup));
router.post(`/login`,validator.body(adminLoginValidation),trycatch(login));
router.post(`/candidate`,checkAuth,checkAdmin,validator.body(candidateCreateValidation),trycatch(createCandidate));
router.get(`/candidates`,checkAuth,checkAdmin,trycatch(getAllCandidates));
router.route(`/candidate/:id`)
.get(checkAuth,checkAdmin,trycatch(getACandidate))
.put(checkAuth,checkAdmin,trycatch(deleteCandidate));

export default router;