import { sendEmail } from "../../../services/email.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import userModel from "../../../../DB/model/User.model.js"
import { asynchandler } from "../../../services/handleError.js"
import { findbyId, findone, updateone } from "../../../../DB/DBMethods.js"

export const signup=asynchandler( async(req,res,next)=>{
    const { userName, email, password } = req.body
   
    const user=await findone(userModel,{email})
    if(user){
        next(new Error ("email already exist",{cause:409}))
       
    }
    else{
        const hashpassword=await bcrypt.hash(password, parseInt(process.env.SALTROUND))
       
        const newUser = new userModel({ email, password: hashpassword,  userName })

        const token=jwt.sign({id:newUser._id},process.env.emailToken,{expiresIn:'1h'})
        const link=`${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`

        const rftoken=jwt.sign({id:newUser._id},process.env.emailToken)
        const rflink=`${req.protocol}://${req.headers.host}/api/v1/auth/requestNewConfiemEmail/${rftoken}`

        const message=`<a href=${link}>confirm Email</a>
        <br>
        <a href=${rflink}>request new confirm Email</a>

        `
        const sentemail=await sendEmail(newUser.email,"confirmEmail",message)
        if(sentemail.accepted.length){
            await newUser.save()
            res.status(201).json({message:"done",newUser})
        }else{
            next(new Error ("please provide real email",{cause:400}))
            
        }

}

})


export const confirmEmail=asynchandler( async(req,res,next)=>{
  
    const {token}=req.params
    const decoded=jwt.verify(token,process.env.emailToken)
    if(decoded&&decoded.id){
        //const user=await userModel.findById(decoded.id)
        const user=await findbyId({model:userModel,conditions:{_id:decoded.id}})
        if(user){
            if(user.confirmEmail==false){
                //const confirmUser=await userModel.updateOne({_id:user._id},{confirmEmail:true},{new:true})
                const confirmUser=await updateone( {model:userModel,conditions:{_id:user._id},options:{confirmEmail:true}})
                res.status(200).json({message:"please logIn"})
            }else{
                next(new Error ("email already confirmed!!",{cause:400}))
               }
                
        }else{ next(new Error ("invalid account",{cause:400}))
           
        }
    }else{
        next(new Error ("invalid token email",{cause:400}))
        
    }
        
    
    
})

export const signIn=asynchandler( async(req,res,next)=>{
    
        const {email,password}=req.body
        //const user=await userModel.findOne({email})
        const user=await findone({model:userModel,conditions:{email}})
        if((!user)||user.blocked){
            next(new Error ("invalid  account",{cause:400}))
            
        }else{
        
            if(user.confirmEmail==true){
                const match = await bcrypt.compare(password, user.password)
                if(!match){
                    next(new Error ("password is incorrect",{cause:400}))
                    
                }else{
                    const acesstoken=jwt.sign({id:user._id,isLoggedIn: true},process.env.tokenSignature,{expiresIn:60*60*24} )
                    
                
                    res.status(200).json({message:" done",acesstoken})
                }
            }else{
                next(new Error ("please confirm your email first",{cause:400}))
                
            }
       
    }
   
    
})


export const refreshToken =asynchandler( async (req, res) => {
   
        const {rftoken }= req.params
        const decoded = jwt.verify(rftoken, process.env.emailToken)
        if (!decoded || !decoded.id) {
            next(new Error ("invalid token email",{cause:400}))
        } else {
            const user=await findbyId({model:userModel,conditions:{_id:decoded.id},select:"userName email confirmEmail"})
            if (!user) {
                next(new Error ("Not register account",{cause:400}))
                
            } else {
                if (user.confirmEmail) {
                    next(new Error ("Already confirmed"))
                    
                } else {
                    const token = jwt.sign({ id: user._id }, process.env.emailToken,{expiresIn:'1h'})
                    const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`

                    const message = `
                <a href ='${link}'> Follow to activate u account </a>
    
                `
                sendEmail(user.email,"confirmEmail",message)
                   
                    res.json({ message: "Done", link })

                }
            }
        }
    

})

export const sendCode = async (req, res) => {
    const { email } = req.body
    const user=await findone({model:userModel,conditions:{email},select:'userName email'})
   
    if (!user) {
        next(new Error ("Not register account",{cause:400}))
    } else {
        // const accessCode = Math.floor(Math.random() * (1999 - 1970 + 1)) + 1970
        const accessCode = nanoid()
        await userModel.findByIdAndUpdate(user._id, { code: accessCode })
        sendEmail(user.email,"access code", `<h1>access code :  ${accessCode} </h1>`)
        res.json({ message: "Done check u email" })
    }
}


export const forgetPassword = async(req, res) => {
    const { email, code, password } = req.body
    if (!code) {
        next(new Error ("Account dosn't require forget password yet!",{cause:400}))
        
        
    } else {
        const user=await findone({model:userModel,conditions:{email, code}})
        
        if (!user) {
            next(new Error ("In-valid account or In-valid OTP code" ,{cause:400}))
            
        } else {
            const hashPassword  = await  bcrypt.hash(password ,  parseInt(process.env.SALTROUND))
            await  updateone ({model:userModel,conditions:{_id:user._id} ,options: {code:null , password : hashPassword}})
            res.json({message:"Done"})
            
        } 
    }
  
}