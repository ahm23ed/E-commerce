import { asynchandler } from "../../../services/handleError.js"
import slugify from 'slugify'
import brandModel from "../../../../DB/model/brand.model.js"
import { createandsave, findbyId, findoneAndUpdate,find } from "../../../../DB/DBMethods.js"
import cloudinary from "../../../services/cloudinary.js"
import { paginate } from "../../../services/pagination.js"

export const createbrand=asynchandler (async(req,res,next)=>{
    if (!req.file) {
       
        next(new Error("Please upload u image",{cause:400}))
    } else {
        const{name}=req.body
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
            folder: `categery`
        })
     const brand=await createandsave({model:brandModel,options:{name,
        slug:slugify(name),
        image:secure_url,createdBy:req.user._id,publicImage_id:public_id}})
     res.json({message:"done",brand})
    }

}
)


export const updatebrand= asynchandler( async(req,res,next)=>{
    const {id}=req.params
    console.log(id);
    const brand=await findbyId({model:brandModel,conditions:{_id:id}})
    if(!brand){
        next(new Error("not found brand",{cause:400}))
    }else{
        if(req.file){
            const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
                folder: `brand`
            })
            req.body.image=secure_url
            req.body.publicImage_id=public_id
        }
        if(req.body.name){
             req.body.slug=slugify(req.body.name)
        }
        const updatedbrand=await findoneAndUpdate({model:brandModel,conditions:{_id:id},options:req.body})
        await cloudinary.uploader.destroy(updatedbrand.publicImage_id)
            res.json({message:"done",updatedbrand})
    }
})

export const brands=asynchandler(async(req,res,next)=>{
    const{skip,limit}=paginate(req.query.page,req.query.size)

    const brands=await find({model:brandModel,conditions:{},select:"" ,skip:skip , limit:limit,populate: [{
        path:'createdBy',
        select:'userName email'
    }
       
    ]})

    
            res.json({message:"done",brands})
    }
)