import { createandsave, findone, updateone } from "../../../../DB/DBMethods.js";
import { asynchandler } from "../../../services/handleError.js";
import productModel from '../../../../DB/model/product.model.js'
import couponModel from "../../../../DB/model/coupon.model.js";
import orderModel from "../../../../DB/model/order.model.js";
import  moment  from 'moment';


export const createOrder= asynchandler(async(req,res,next)=>{
    const {products,couponId}=req.body
    const finalproducts=[]
    let totalprice=0
    for(const product of products){
        const checkedproduct=await findone({model:productModel,conditions:{_id:product.productId,stock:{$gte:product.quantity}}})
        if(!checkedproduct){
          return   next(new Error("product is out of stock",{cause:400}))
        }
        finalproducts.push(product)
        totalprice=totalprice+(checkedproduct.finalprice*product.quantity)
    }
    req.body.totalprice=totalprice
    req.body.products=finalproducts
    req.body.userId=req.user._id
    if(couponId){
        const coupon=await findone({model:couponModel,conditions:{_id:couponId,usedBy:{$nin:req.user._id}}})
       const checkDate=moment(coupon.expireDate).fromNow().split(' ').pop()
        if(!coupon||(checkDate=="ago")){
            req.body.finalprice=totalprice
            next(new Error("invalid coupon",{cause:400}))
        }else{
            req.body.finalprice=totalprice-(totalprice*(coupon.amount/100))
        }
        
    }
   
    const order=await createandsave({model:orderModel,options:req.body})
    if(order){
        if(couponId){
            const coupon=await updateone({model:couponModel,conditions:{_id:couponId},
                options:{$addToSet:{usedBy:req.user._id}}})
        }
        return res.json({message:"done"})
    }

    return res.json({message:"fail to create order"})

})