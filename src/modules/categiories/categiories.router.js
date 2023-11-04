import {Router} from 'express';
import * as categioriesController from './categiories.controller.js';
import fileUpload, { fileValidation } from '../../servecies/multer.js';
const router = Router();
router.get('/',categioriesController.getCategories);
router.get('/active',categioriesController.getActiveCategory);

router.get('/:id',categioriesController.getSpecificCategory);
router.post('/',fileUpload(fileValidation.image).single('image'),categioriesController.createCategory);
router.put('/:id',fileUpload(fileValidation.image).single('image'),categioriesController.updateCategory);

export default router;