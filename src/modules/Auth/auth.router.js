import {Router} from 'express';
import * as AuthController from './auth.controller.js';
import fileUpload, { fileValidation } from '../../servecies/multer.js';


const router = Router();
router.post('/signup',fileUpload(fileValidation.image).single('image'),AuthController.signup);
router.post('/signin',AuthController.signin);


export default router;