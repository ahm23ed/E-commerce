import { Router } from "express";
import wishlistRouter from '../wishlist/wishlist.router.js'
import reviewRouter from '../reviews/reviews.router.js'
import {auth} from '../../middleware/auth.js'
import { fileValidation, myMulter } from "../../services/multer.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./product.validation.js"

import { endpoint } from "./product.endPoint.js";
import { createproduct, products, updateproduct } from "./controller/product.js";


const router = Router()
router.use('/:productId/wishlist',wishlistRouter)
router.use('/:productId/review',reviewRouter)

router.post('/',myMulter(fileValidation.image).array('image',7),validation(validators.createproduct),auth(endpoint.create),createproduct)

router.put('/:id',myMulter(fileValidation.image).array('image',7),validation(validators.updateproduct),auth(endpoint.update),updateproduct)
 router.get("/",validation(validators.products),auth(endpoint.get),products)




export default router