import { createandsave, deleteone, find, findbyId, findone, updateone } from "../../../../DB/DBMethods.js";
import { asynchandler } from "../../../services/handleError.js";
import productmodel from '../../../../DB/model/product.model.js'
import reviewModel from "../../../../DB/model/review.model.js";
import orderModel from '../../../../DB/model/order.model.js'


export const addReview=asynchandler(async(req,res,next)=>{
   
    const{productId}=req.params
    req.body.createdBy=req.user._id


    // const checkreview=await findone({model:reviewModel,conditions:{createdBy:req.user._id,productId}})
    // if (checkreview){
    //     return   next(new Error("already reviewed",{cause:400}))
    // }
    const order=await findone({model:orderModel,conditions:{userId:req.user._id,status:'recieved',
    'order.products.productId':productId},select:""})
    
    if(!order) {
        return   next(new Error("complete your order first",{cause:400}))
    }
    req.body.productId=productId
    const review=await createandsave({model:reviewModel,options:req.body})
    if(!review){
        return   next(new Error("Fail to create",{cause:400}))
    }
    const productreviews=await find({model:reviewModel,conditions:{productId:productId}})
    
   let calc=0
   for (const review of productreviews ){
    calc= calc+review.starsNum
   }
     
    await updateone({model:productmodel,conditions:{_id:productId},options:{avgRate:(calc/productreviews.length)}})
    
    return res.json({message:"done",review})
})


export const updateReview=asynchandler(async(req,res,next)=>{
    let newavg=0
    const{id}=req.params
    req.body.updatedBy=req.user._id
    const review=await findone({model:reviewModel,conditions:{_id:id},select:"productId"})
    if(!review) {
        return   next(new Error("review is invalid",{cause:400}))
    }
       const{productId}=review
        const updatedreview= await updateone({model:reviewModel,conditions:{_id:id},options:req.body})

        if(!updatedreview){
            return   next(new Error("Fail to update",{cause:400}))
        }
        if(req.body.starsNum){
            const productreviews=await find({model:reviewModel,conditions:{productId:productId}})
    
            let calc=0
            for (const review of productreviews ){
             calc= calc+review.starsNum
            }
              
             await updateone({model:productmodel,conditions:{_id:productId},options:{avgRate:(calc/productreviews.length)}})
             
             return res.json({message:"done"})
        }
    
   
})


export const deleteReview=asynchandler(async(req,res,next)=>{
    let newavg=0
    const{id}=req.params
    req.body.deletedBy=req.user._id
    const review=await findone({model:reviewModel,conditions:{_id:id}})
    if(!review) {
        return   next(new Error("review is invalid",{cause:400}))
    }
        const{productId}=review
        const deletedreview= await deleteone({model:reviewModel,conditions:{_id:id}})

        if(!deletedreview){
            return   next(new Error("Fail to delete",{cause:400}))
        }
       
        const productreviews=await find({model:reviewModel,conditions:{productId:productId}})
        
        if(productreviews){
            let calc=0
            for (const review of productreviews ){
             calc= calc+review.starsNum
            }
              
             await updateone({model:productmodel,conditions:{_id:productId},options:{avgRate:(calc/productreviews.length)}})
        }else{
            await updateone({model:productmodel,conditions:{_id:review.productId},options:{avgRate:null}})
        }
        
    
       
        
        
        return res.json({message:"done"})
        
    
   
})


export const Getallreviewsofspecificproduct=asynchandler(async(req,res,next)=>{
    const{productId}=req.params
    const product=await findbyId({model:productmodel,conditions:{_id:productId}})
    if(!product) {
        return   next(new Error("product is invalid",{cause:400}))
    }
    const productreviews=await find({model:reviewModel,conditions:{productId:productId}})
    return res.json({message:"done",productreviews})
})

export const GetallreviewsofproductoAnduser=asynchandler(async(req,res,next)=>{
    const{productId,userId}=req.params
    const product=await findbyId({model:productmodel,conditions:{_id:productId}})
    if(!product) {
        return   next(new Error("product is invalid",{cause:400}))
    }
    const reviews=await find({model:reviewModel,conditions:{productId:productId,createdBy:userId}})
    return res.json({message:"done",reviews})
})
