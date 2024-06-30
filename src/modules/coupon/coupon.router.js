import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { create, deletecoupon, update } from "./controller/coupon.js";
import { endpoint } from "./coupon.endPoint.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./coupon.validation.js"
const router = Router()




router.post('/',validation(validators.create), auth(endpoint.create),create)
router.put('/:id',validation(validators.update), auth(endpoint.update),update)
router.patch('/:id',validation(validators.deletecoupon), auth(endpoint.create),deletecoupon)




export default router