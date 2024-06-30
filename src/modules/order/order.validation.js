import joi from 'joi'

export const createOrder = {
    body: joi.object().required().keys({
        address: joi.string().required(),
        couponId: joi.string().required(),
        phone:joi.number().required() ,
        products:joi.array().items({
            productId: joi.string()
              .required(),
            quantity: joi.number()
            .required(), 
          }),
        
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required(),
        
    }).options({ allowUnknown: true })
}

