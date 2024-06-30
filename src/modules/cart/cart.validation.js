import joi from 'joi'

export const createcart = {
    body: joi.object().required().keys({
        
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
