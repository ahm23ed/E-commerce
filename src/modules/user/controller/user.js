import { findbyId, findoneAndUpdate, updateone } from "../../../../DB/DBMethods.js";
import userModel from "../../../../DB/model/User.model.js";
import { asynchandler } from "../../../services/handleError.js";
import bcrypt from 'bcryptjs'


export const softDeleteProfile=asynchandler(async(req,res)=>{
    const user=await findbyId({model:userModel,conditions:{_id:req.user._id}})
    console.log(req.user._id);
    if(user.Deleted==false){
      // const deletedUser=await userModel.findByIdAndUpdate(req.user._id,{isDeleteted:true},{new:true})
        const deletedUser=await findoneAndUpdate({model:userModel,conditions:{_id:req.user._id},options:{Deleted:true}})
        res.status(200).json({ message: "done", deletedUser })
    }else{
        next(new Error("user is already soft deleted",{cause:400}))
      // res.status(400).json({ message: "user is already soft deleted" })
        }
    
    })
    
    export const updatePassword =asynchandler( async (req, res) => {
    
        const { oldPassword, newPassword } = req.body
        const user=await findbyId({model:userModel,conditions:{_id:req.user._id}})
        const match = await bcrypt.compare(oldPassword, user.password)
        
        if (!match) {
            next(new Error("In-valid Password" ,{cause:400}))
            
        } else {
            const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALTROUND))
            
            await findoneAndUpdate({model:userModel,conditions:{_id:req.user._id},options:{password:hashPassword}})
            res.status(200).json({message:"Done"})
        }
    })


    export const blockAccount=async(req,res)=>{
        
        const {id}=req.params
    
    const user=await updateone({model:userModel,conditions:{_id:id},options:{blocked :true}})
        //const user=await userModel.updateOne({_id:id},{blocked :true})  
        res.status(200).json({message:"suceefully blocked",user})
    

        
}

export const getUserById=async(req,res)=>{
    
    const {id}=req.params
    
    const user=await findbyId({model:userModel,conditions:{_id:id}})
        //const user=await userModel.updateOne({_id:id},{blocked :true})  
        res.status(200).json({message:"suceefully blocked",user})
    

    
}


