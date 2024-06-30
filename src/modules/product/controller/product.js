import { createandsave, find, findbyId, findone, findoneAndUpdate, updateone } from "../../../../DB/DBMethods.js"
import subcategoryModel from '../../../../DB/model/subcategory.model.js'
import brandModel from '../../../../DB/model/brand.model.js'
import { asynchandler } from "../../../services/handleError.js"
import cloudinary from '../../../services/cloudinary.js'
import { paginate } from "../../../services/pagination.js"
import slugify from 'slugify'
import producrModel from "../../../../DB/model/product.model.js"


export const createproduct=asynchandler(async(req,res,next)=>{
  const{name,amount,price,discount,subcategoryId,categoryId,brandId}=req.body
    if (!req.files) {
       
      return   next(new Error("Please upload product images",{cause:400}))
    } else {

        req.body.stock=amount
        req.body.createdBy=req.user._id
        req.body.slug=slugify(name)

        
        discount? req.body.finalprice=price-(price*(discount/100)):req.body.finalprice=price
        
     
        const subcategory=await findone({model:subcategoryModel,conditions:{_id:subcategoryId,categoryId}})
        if(!subcategory){
          return   next(new Error("not found subcategory or category",{cause:400}))
        }
        const brand=await findbyId({model:brandModel,conditions:{_id:brandId}})
        if(!brand){
            return  next(new Error("not found brand",{cause:400}))
        }
        const images=[]
        const public_ids=[]
        for(const file of req.files){
            const {secure_url,public_id} = await cloudinary.uploader.upload(file.path, {
                folder: 'E-commerce/product'
            })
            images.push(secure_url)
            public_ids.push(public_id)
        }
        req.body.images=images
        req.body.publicImages_id=public_ids
        
        

        const product=await createandsave({model:producrModel,options:req.body})
        if(!product){
            for(const imageId of req.body.publicImages_id){
                await cloudinary.uploader.destroy(imageId)
            }
            
            res.json({message:"fail to create product"})
        }else{
            res.json({message:"done",product})
        }
               
                
            

        
            }
    }



) 

export const updateproduct= asynchandler( async(req,res,next)=>{
    const {id}=req.params
    const{name,amount,price,discount,subcategoryId,categoryId,brandId}=req.body
    const product=await findbyId({model:producrModel,conditions:{_id:id}})
    if(!product){
       return  next(new Error("not found product",{cause:400}))
    }

    if(name){
        req.body.slug=slugify(name)
    }

    if(price&&discount){
        req.body.finalprice=Math.abs(price-(price*(discount/100)))}
    else if(price){
        req.body.finalprice=Math.abs(price-(price*(product.discount/100)))
    }
    else if(discount){
        req.body.finalprice=Math.abs(product.price-(product.price*(discount/100)))
    }

    if(amount){
        const sub=amount-product.solditems
        sub>=0?req.body.stock=sub:req.body.stock=0
    }
    if(subcategoryId&&categoryId){
        const subcategory=await findone({model:subcategoryModel,conditions:{_id:subcategoryId,categoryId}})
        if(!subcategory){
          return   next(new Error("not found subcategory or category",{cause:400}))
        }
       
    }
    if(brandId){
        const brand=await findbyId({model:brandModel,conditions:{_id:brandId}})
        if(!brand){
            return  next(new Error("not found brand",{cause:400}))
        }
    }
    
    if (req.files.length){
        const images=[]
        const public_ids=[]
        for(const file of req.files){
            const {secure_url,public_id} = await cloudinary.uploader.upload(file.path, {
                folder: `E-commerce/product`
            })
            images.push(secure_url)
            public_ids.push(public_id)
        }
        req.body.images=images
        req.body.publicImages_id=public_ids
    }
        
       
        
       
        req.body.updatedBy=req.user._id
      
        

        const updatedproduct=await findoneAndUpdate({model:producrModel,conditions:{_id:id},options:req.body})
        if(updatedproduct){
            if(req.files){
                for(const imageId of updatedproduct.publicImages_id){
                    await cloudinary.uploader.destroy(imageId)
                }
            }
           
            res.json({message:"done",updatedproduct})
    
        }
        else{
            for(const imageId of req.body.publicImages_id){
                await cloudinary.uploader.destroy(imageId)
            }
            
            res.json({message:"fail to update product"})
        }
        
})

export const products=asynchandler(async(req,res,next)=>{
    const{skip,limit}=paginate(req.query.page,req.query.size)

    const products=await find({model:producrModel,conditions:{},select:"" ,skip:skip , limit:limit,populate: [
        {
        path:'createdBy',
        select:'userName email'
    },{
        path:'subcategoryId',
        select:'name',
        populate:[{
            path:'categoryId',
            select:'name'
        }]
    },{
        path:'reviews'
    }
       
    ]})

    
            res.json({message:"done",products})
    }


)