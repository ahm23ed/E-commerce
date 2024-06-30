import { createandsave, findone, findoneAndUpdate } from "../../../../DB/DBMethods.js";
import cartModel from "../../../../DB/model/cart.model.js";
import { asynchandler } from "../../../services/handleError.js";



export const addtoCart=asynchandler(async(req,res,next)=>{
    //if user has no cart
    const {products}=req.body
    const cart=await findone({model:cartModel,conditions:{ userId:req.user._id}})
    if(!cart){
        const newcart=await createandsave({model:cartModel,options:{
            userId:req.user._id,
            products:products
        }})
        return res.json({message:"done",newcart})
    }
  //if user has already cart
  console.log(products);
  for (const product of products){
    let match=false
    for(let i=0;i<cart.products.length;i++){
       if(product.productId==cart.products[i].productId.toString()){
        cart.products[i]=product
        match=true
        break
       }
    }
    if(match==false){
        cart.products.push(product)
    }}
    const updatedCart=await findoneAndUpdate({model:cartModel,conditions:{_id:cart._id,userId:req.user._id},options:{products:cart.products}})
    res.json({message:"done",updatedCart})
  

})