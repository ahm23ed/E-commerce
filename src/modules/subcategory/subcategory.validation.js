import joi from 'joi'

export const createsubcategory = {
    
   body:joi.object().required().keys({
        name:joi.string().required(),
        categoryId:joi.string().required()
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
}

export const updatesubcategory = {
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