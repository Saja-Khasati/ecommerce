import couponModel from "../../../DB/coupon.mode.js";

export const createCoupon = async(req,res)=>{
    const {name,amount} = req.body;
    const c = await couponModel.findOne({name});
    if(c){
        return res.status(409).json({message:"coupon name already exists"});
        }
        const coupon = await couponModel.create({name,amount});
       return res.status(201).json({message:"success",coupon});
    
}

export const getCoupons = async(req,res)=>{
    const coupons =await couponModel.find({isDeleted:false});
    return res.status(200).json({message:"success",coupons});


   }

export const updateCoupon= async(req,res)=>{
    const coupon = await couponModel.findById(req.params.id)
    if(!coupon){
        return res.status(404).json({message:"coupon not found"});
    }
    if(req.body.name){
        if(await couponModel.findOne({name:req.body.name}).select('name')){
            return res.status(409).json({message:`category ${req.body.name} already exists`});
        }
        coupon.name = req.body.name;
        
    }
    if(req.body.amount){
        coupon.amount=req.body.amount;
    }
    await coupon.save();
    return res.status(200).json({message:"success",coupon});
}


export const softDelete = async(req,res)=>{
    const {id} = req.params;
    const coupon = await couponModel.findOneAndUpdate({_id:id,isDeleted:false},{isDeleted:true},{new:true});
    if(!coupon){
        return res.status(400).json(" can't delete this coupon");

    }
    return res.status(200).json({message:"success"});

}

export const hardDelete  = async(req,res)=>{
    const {id} = req.params;
    const coupon = await couponModel.findOneAndDelete({_id:id,isDeleted:true});
    if(!coupon){
        return res.status(400).json(" can't delete this coupon");

    }
    return res.status(200).json({message:"success"});

}

export const restore = async(req,res)=>{
    const {id} = req.params;
    const coupon = await couponModel.findOneAndUpdate({_id:id,isDeleted:true},{isDeleted:false},{new:true});
    if(!coupon){
        return res.status(400).json(" can't restore this coupon");

    }
    return res.status(200).json({message:"success"});
}





