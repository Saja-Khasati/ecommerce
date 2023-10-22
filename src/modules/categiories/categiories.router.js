import {Router} from 'express';
import * as categioriesController from './categiories.controller.js';
const router = Router();
router.get('/',categioriesController.getCategories);

export default router;