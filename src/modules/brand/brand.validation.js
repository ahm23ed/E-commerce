import joi from 'joi'

export const createbrand = {
   body:joi.object().required().keys({
        name:joi.string().required()
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
}

export const updatebrand = {
    params:joi.object().required().keys({
        id:joi.string().required()
    }),

    body:joi.object().required().keys({
        name:joi.string().required()
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
    
}

