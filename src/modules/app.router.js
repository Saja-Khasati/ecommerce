import categioriesRouter from './categiories/categiories.router.js';
import productsRouter from './products/products.router.js';

const initApp = (app,express)=>{
    app.use(express.json());

    app.get('/',(req,res)=>{
        return res.status(200).json({message:"Welcome"});
    })
   
    app.use('/categiories',categioriesRouter);
    app.use('/products',productsRouter);
   
    app.get('*',(req,res)=>{
        return res.status(200).json({message:"Page not found"});
    })
}

export default initApp;