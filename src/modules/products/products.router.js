import {Router} from 'express';
import * as productRouter from './products.controller.js' ;
const router = Router();
router.get('/',productRouter.getProducts);

export default router;