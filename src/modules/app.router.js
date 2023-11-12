import connectDB from '../../DB/connection.js';
import categioriesRouter from './categiories/categiories.router.js';
import productsRouter from './products/products.router.js';
import AuthRouter from './Auth/auth.router.js';
import subCategoryRouter from './subcategory/subcategory.router.js';
import couponRouter from './coupon/coupon.router.js';
import { sendEmail } from '../servecies/email.js';

const initApp = async (app,express)=>{
    try{
        app.use(express.json());
        connectDB();
        app.get('/',(req,res)=>{
            return res.status(200).json({message:"Welcome"});
        })
        app.use('/auth',AuthRouter);
        app.use('/categiories',categioriesRouter);
        app.use('/products',productsRouter);
        app.use('/subcategory',subCategoryRouter);
        app.use('/coupon',couponRouter);
     
     
        app.get('*',(req,res)=>{
            return res.status(200).json({message:"Page not found"});
        })
    }catch(error){
        console.log(error.stack);
    }
   
}

export default initApp;