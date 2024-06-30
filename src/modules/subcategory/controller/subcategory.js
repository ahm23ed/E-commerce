import { resolveContent } from 'nodemailer/lib/shared/index.js'
import { createandsave, find, findbyId, findone, findoneAndUpdate, updateone } from '../../../../DB/DBMethods.js'
import categoryModel from '../../../../DB/model/category.model.js'
import subcategoryModel from '../../../../DB/model/subcategory.model.js'
import cloudinary from '../../../services/cloudinary.js'
import { asynchandler } from '../../../services/handleError.js'
import { paginate } from "../../../services/pagination.js"


export const createSubcategory=asynchandler(async(req,res,next)=>{
       
    if (!req.file) {
       
        next(new Error("Please upload u image",{cause:400}))
    } else {
        const {categoryId}=req.params
        const{name}=req.body
        const category= await findbyId({model:categoryModel,conditions:{_id:categoryId}})
        if(!category){
            next(new Error("invalid categry id",{cause:400}))
        }
        else{
            const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
                folder: `categery/subcategory`
            })
         const subcategory=await createandsave({model:subcategoryModel,options:{name,image:secure_url,createdBy:req.user._id,
            categoryId,publicImage_id:public_id}})
            res.json({message:"done",subcategory})
        }
    
        }
        
}

) 

export const updatesubcategory= asynchandler( async(req,res,next)=>{
    const {id}=req.params
    //console.log(id);
    const subcategory=await findbyId({model:subcategoryModel,conditions:{_id:id}})
   // console.log(subcategory);
    if(!subcategory){
        next(new Error("not found subcategory",{cause:400}))
    }else{
        if(req.file){
            const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
                folder: `categery`
            })
            req.body.image=secure_url
            req.body.publicImage_id=public_id
            
        }
        const updatedsubcategory=await findoneAndUpdate({model:subcategoryModel,conditions:{_id:id},options:req.body})
        
        if(updatedsubcategory&&req.body.image){
            console.log(req.body.image);
           const result= await cloudinary.uploader.destroy(updatedsubcategory.publicImage_id)
          
           console.log(result);
            res.json({message:"done",updatedsubcategory})
        }else{
            const result= await cloudinary.uploader.destroy(req.body.publicImage_id)
            

            res.json({message:"done"})
        }
       
    }
})

export const subcategoryById=asynchandler(async(req,res,next)=>{
    
    const {id}=req.params
    const category=await findbyId({model:subcategoryModel,conditions:{_id:id},select:"" , populate:[{
        path:'categoryId',
        select:'name createdBy'
    }
       
    ]})

    
            res.json({message:"done",category})
    }
)

export const allCategorywithTheirSubcategories=asynchandler(async(req,res,next)=>{
    const categories=await find({model:categoryModel,conditions:{}})
    const  allcategories=[]
    for(let i=0 ;i<categories.length;i++){
     const subcategeries=await find({model:subcategoryModel,conditions:{categoryId:categories[i]._id},select:"name image"})
     allcategories.push(categories[i],{subcategeries})
    }
    res.json({message:"done",allcategories})
})