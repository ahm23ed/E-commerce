import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { createOrder } from "./controller/order.js";
import { endpoint } from "./order.endPoint.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./order.validation.js"

const router = Router()




router.post('/',validation(validators.createOrder), auth(endpoint.create),createOrder)




export default router