import {Router} from 'express';
import * as CartController from './cart.controller.js';
import { endPoint } from './cart.endpoint.js';
import { auth } from '../../middleware/Auth.js';




const router = Router();
router.post('/',auth(endPoint.create),CartController.createCart);
router.patch('/removeItem',auth(endPoint.delete),CartController.removeItem);
router.patch('/clear',auth(endPoint.clear),CartController.clearCart);
router.get('/',auth(endPoint.get),CartController.getCart);


export default router;