import userModel from "../../DB/model/User.model.js";
import { userSchema } from "../DB/models/user.model.js"

export const checkprofile=() =>{
    return async (req, res, next) => {
        const userID = req.user._id;
        const user = await findOne(userModel,{ _id: userID });

        const uncompletedfields=[]

    for (var key of Object.keys(userSchema.obj)) {
        if(user[key]==undefined){
            uncompletedfields.push(key)

          
        }}
        if (uncompletedfields.length) {
            res.status(400).json({
                message: `Please compelete these fields in profile first...${uncompletedfields}`
              });
          
        } else {
            next()
        }
        
    }}