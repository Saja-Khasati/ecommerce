import {Router} from 'express';
import * as productController from './products.controller.js' ;
//import { endPoint } from './products.endpoints.js';
import fileUpload, { fileValidation } from '../../servecies/multer.js';
import { endPoint } from './products.endpoints.js';
import { auth } from '../../middleware/Auth.js';
const router = Router();
router.get('/',productController.getProducts);
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:4},
]),productController.createProducts);


export default router;