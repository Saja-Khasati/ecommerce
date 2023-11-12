import {Router} from 'express';
import * as categioriesController from './categiories.controller.js';
import fileUpload, { fileValidation } from '../../servecies/multer.js';
import subCategoryRouter from '../subcategory/subcategory.router.js';
import { auth } from '../../middleware/Auth.js';
import { endPoint } from './category.endpoint.js';
const router = Router();

router.use('/:id/subcategory',subCategoryRouter)
router.get('/',auth(endPoint.getAlls),categioriesController.getCategories);
router.get('/active',auth(endPoint.getActive),categioriesController.getActiveCategory);

router.get('/:id',auth(endPoint.specific),categioriesController.getSpecificCategory);
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),categioriesController.createCategory);
router.put('/:id',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),categioriesController.updateCategory);

export default router;