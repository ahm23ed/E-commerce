import joi from 'joi'

export const softDeleteProfile = {
   
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
}

export const updatePassword = {
    body: joi.object().required().keys({
        oldPassword: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        newPassword : joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
    }),

    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
    
}

export const blockaccount = {
    params:joi.object().required().keys({
        id:joi.string().required()
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
}

export const getuserbyid = {
    params:joi.object().required().keys({
        id:joi.string().required()
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
}