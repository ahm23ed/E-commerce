import joi from 'joi'


export const signup = {
    body: joi.object().required().keys({
        userName: joi.string().min(2).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword: joi.string().valid(joi.ref('password')).required(),
    })
}


export const confirmEmail = {
    params: joi.object().required().keys({
        token: joi.string().required()
    })
}


export const signin = {
    body: joi.object().required().keys({
     
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
    })
}