import joi from 'joi'

export const create = {
    body: joi.object().required().keys({
        name: joi.string().required(),
        amount:joi.number().required() ,
        expireDate:joi.date(),
        
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
}

export const update = {
    body: joi.object().required().keys({
        name: joi.string().required(),
        amount:joi.number().required() ,
        expireDate:joi.date(),
        
    }),
    params:joi.object().required().keys({
        id:joi.string().required()
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
}

export const deletecoupon = {
   
    params:joi.object().required().keys({
        id:joi.string().required()
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
}

