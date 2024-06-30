import { Router } from "express";
import { confirmEmail, forgetPassword, refreshToken, sendCode, signIn, signup } from "./controller/registration.js";
import { validation } from '../../middleware/validation.js'
import * as validators from './auth.validation.js'
const router = Router()


router.post('/signup' ,validation(validators.signup) ,signup)
 router.get('/confirmEmail/:token',validation(validators.confirmEmail),confirmEmail)
 router.post('/signin',validation(validators.signin) ,signIn)
 router.get('/requestNewConfiemEmail/:rftoken' ,refreshToken)
 router.patch("/sendCode" , sendCode)
router.patch("/forgetPassword" ,forgetPassword)
export default router