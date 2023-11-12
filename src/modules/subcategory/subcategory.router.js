import {Router} from 'express';
import * as subcategioriesController from './subcategory.controller.js';
import fileUpload, { fileValidation } from '../../servecies/multer.js';
const router = Router({mergeParams:true});

router.post('/',fileUpload(fileValidation.image).single('image'),subcategioriesController.createSubCategory);
router.get('/',subcategioriesController.getSubCategories)


export default router;