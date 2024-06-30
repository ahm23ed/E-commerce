import joi from 'joi'

export const createproduct = {
    body: joi.object().required().keys({
        name: joi.string().required(),
        description: joi.string().required(),
        price:joi.number().required() ,
        discount:joi.number().required() ,
        amount:joi.number().required() ,
        colors:joi.array().items(joi.string()),
        sizes:joi.array().items(joi.string().valid('m','s','l')),
        categoryId: joi.string().required(),
        subcategoryId: joi.string().required(),
        brandId: joi.string().required(),
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
}

export const updateproduct = {
    body: joi.object().required().keys({
        name: joi.string().required(),
        description: joi.string().required(),
        price:joi.number().required() ,
        discount:joi.number().required() ,
        amount:joi.number().required() ,
        colors:joi.array().items(joi.string()),
        sizes:joi.array().items(joi.string().valid('m','s','l')),
        categoryId: joi.string().required(),
        subcategoryId: joi.string().required(),
        brandId: joi.string().required(),
    }),
    params:joi.object().required().keys({
        id:joi.string().required()
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
       
    }).options({ allowUnknown: true })
}

export const products = {
    query: joi.object({
        limit: joi.number().integer(),
        skip: joi.number().integer()
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
       
    }).options({ allowUnknown: true })
}