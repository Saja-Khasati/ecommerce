import userModel from "../../../DB/user.model.js";
import bcrypt from 'bcryptjs';
import cloudinary from "../../servecies/cloudinary.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../servecies/email.js";

export const signup = async (req,res)=>{
    const {userName,email,password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        return res.status(409).json({message:"email is already exists"});
    }
    const hashedPassword =  bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
    const {secure_url,public_id} =await cloudinary.uploader.upload((req.file.path),{
        folder:`${process.env.APP_NAME}/users`
    })
    const token= jwt.sign({email},process.env.CONFIRMEMAILSECRET);
    await sendEmail(email,"confirm Email",`<a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>verify</a>`);
    const createUser = await userModel.create({userName,email,password:hashedPassword,image:{secure_url,public_id}});
    return res.status(201).json({message:"success",createUser});

}

export const confirmEmail = async(req,res)=>{
    const token = req.params.token;
    const decoded = jwt.verify(token,process.env.CONFIRMEMAILSECRET);
    if(!decoded){
        return res.status(404).json({message:"Invalid token"});

    }
    const user = await userModel.findOneAndUpdate({email:decoded.email,confirmEmail:false},{confirmEmail:true});
    if(!user){
        return res.status(400).json({message:"Invalid verify your email or your email is verified"});
        
    }
    return res.status(200).json({message:" your email is verified"});
}

export const sendCode = async(req,res)=>{
    const {email} = req.body;
    let code = customAlphabet('1234567890abcdzABCDZ', 4);
    code= code();
    const user = await userModel.findOneAndUpdate({email},{sendCode:code},{new:true});
    const html = `<h2> code is : ${code} </h2>`;
    await sendEmail(email,`resetPassword`,html);
    return res.status(200).json({message:"success",user});
}

export const forgetPassword = async(req,res)=>{
    const {email,password,code}=req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"not register account"});
    }
    if(user.sendCode != code){
        return res.status(400).json({message:"Invalid code"});
    }
    user.password=await bcrypt.hash(password,parseInt(procee.env.SALTROUND));
    user.sendCode = null;
    await user.save();
    return res.status(200).json({message:"success"});

}

export const signin = async(req,res)=>{
    const {email,password}= req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"data Invalid (email)"});
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        return res.status(400).json({message:"data Invalid (pass)"});
    }
    const token = jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSECRET,{expiresIn:'5m'});
    const refreshToken = jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSECRET,{expiresIn:60*60*24*30});
   
    return res.status(200).json({message:"success",token,refreshToken});
}