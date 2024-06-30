import { createandsave, findoneAndUpdate } from "../../../../DB/DBMethods.js";
import couponModel from "../../../../DB/model/coupon.model.js";
import { asynchandler } from "../../../services/handleError.js";
import  moment  from 'moment';

export const create=asynchandler(async(req,res,next)=>{
    req.body.createdBy=req.user._id
    // req.body.expireDate=moment(req.body.expireDate).format("f")
    //  console.log(req.body.expireDate.fromNow())
    const coupon=await createandsave({model:couponModel,options:req.body})
    if(coupon){
        res.json({message:"done",coupon})
    }else{
         next(new Error("fail to create",{cause:400}))
        }
    
})

export const update=asynchandler(async(req,res,next)=>{
    req.body.updatedBy=req.user._id
    const coupon=await findoneAndUpdate({model:couponModel,conditions:{_id:req.params.id},options:req.body})
    if(coupon){
        res.json({message:"done",coupon})
    }else{
         next(new Error("fail to update",{cause:400}))
        }
    
})

export const deletecoupon=asynchandler(async(req,res,next)=>{
    
    const coupon=await findoneAndUpdate({model:couponModel,conditions:{_id:req.params.id},options:{deleted:true,deletedBy:req.user._id}})
    if(coupon){
        res.json({message:"done",coupon})
    }else{
         next(new Error("fail to delete",{cause:400}))
        }
    
})