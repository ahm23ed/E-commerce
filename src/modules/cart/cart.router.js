import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./cart.endPoint.js";
import { addtoCart } from "./controller/cart.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./cart.validation.js"

const router = Router()




router.post('/',validation(validators.createcart),  auth(endpoint.create),addtoCart)




export default router