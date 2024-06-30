import { findbyId, updateone } from "../../../../DB/DBMethods.js";
import producrModel from "../../../../DB/model/product.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { asynchandler } from "../../../services/handleError.js";


export const  add=asynchandler(async(req,res,next)=>{
    const {productId}=req.params
    const product=await findbyId({model:producrModel,conditions:{_id:productId}})
    if(!product){
          next(new Error("not found product",{cause:400}))
    }else{
        await updateone({model:userModel,conditions:{_id:req.user._id},options:{
            $addToSet:{wishlist:productId}
        }})
        res.json({message:"done"})
    }
})

export const  remove=asynchandler(async(req,res,next)=>{
    const {productId}=req.params
    const product=await findbyId({model:producrModel,conditions:{_id:productId}})
    if(!product){
          next(new Error("not found product",{cause:400}))
    }else{
        await updateone({model:userModel,conditions:{_id:req.user._id},options:{
            $pull:{wishlist:productId}
        }})
        res.json({message:"done"})
    }
})