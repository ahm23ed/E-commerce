import jwt from 'jsonwebtoken'
import  userModel  from '../../DB/model/User.model.js';

export const roles={
    Admin:"Admin",
    User:"User"
}

export const auth = (acessRoles=[roles.User]) => {
    return async (req, res, next) => {
        try {
            
            const { authorization } = req.headers
            //console.log({ authorization });
            if (!authorization?.startsWith(process.env.BearerKey)) {
                res.status(400).json({ message: "In-valid Bearer key" })
            } else {
                const token = authorization.split(process.env.BearerKey)[1]
                const decoded = jwt.verify(token, process.env.tokenSignature)
                if (!decoded?.id || !decoded?.isLoggedIn) {
                    res.status(400).json({ message: "In-valid token payload " })
                } else {
                    const user = await userModel.findById(decoded.id).select('email userName role')
                    if (!user) {
                        //res.status(404).json({ message: "Not register user" })
                        next(new Error('Not register user',{cause:401}))
                    } else {
                          if(!acessRoles.includes(user.role)){
                       next(new Error('unauthrozed user',{cause:403}))
                          }else{
                            req.user = user
                            next()
                          }
                       

                    }
                }
            }
        } catch (error) {
            next(new Error('jwt expired',{cause:400}))
       
        }
     
    }
        }
    