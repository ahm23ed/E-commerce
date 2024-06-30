import { createandsave, find, findbyId, findoneAndUpdate, updateone } from "../../../../DB/DBMethods.js"
import categoryModel from "../../../../DB/model/category.model.js"
import { asynchandler } from "../../../services/handleError.js"
import cloudinary from '../../../services/cloudinary.js'
import { paginate } from "../../../services/pagination.js"


export const createcategory=asynchandler(async(req,res,next)=>{

    if (!req.file) {
       
        next(new Error("Please upload u image",{cause:400}))
    } else {
        const{name}=req.body
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
            folder: `categery`
        })
     const category=await createandsave({model:categoryModel,options:{name,image:secure_url,createdBy:req.user._id,publicImage_id:public_id}})
     res.json({message:"done",category})
    }

}

) 

export const updatecategory= asynchandler( async(req,res,next)=>{
    const {id}=req.params
    console.log(id);
    const category=await findbyId({model:categoryModel,conditions:{_id:id}})
    console.log(category);
    if(!category){
        next(new Error("not found category",{cause:400}))
    }else{
        if(req.file){
            const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
                folder: `categery`
            })
            req.body.image=secure_url
            req.body.publicImage_id=public_id
        }
        const updatedcategory=await findoneAndUpdate({model:categoryModel,conditions:{_id:id},options:req.body})
        await cloudinary.uploader.destroy(updatedcategory.publicImage_id)
            res.json({message:"done",updatedcategory})
    }
})

export const categories=asynchandler(async(req,res,next)=>{
    const{skip,limit}=paginate(req.query.page,req.query.size)

    const categories=await find({model:categoryModel,conditions:{},select:"" ,skip:skip , limit:limit,populate: [{
        path:'createdBy',
        select:'userName email'
    }
       
    ]})

    
            res.json({message:"done",categories})
    }


)