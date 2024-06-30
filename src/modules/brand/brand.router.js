import { Router } from "express";

import {auth} from '../../middleware/auth.js'
import { fileValidation, myMulter } from "../../services/multer.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./brand.validation.js"

import { endpoint } from "./brand.endPoint.js";
import { brands, createbrand, updatebrand } from "./controller/brand.js";


const router = Router()

router.post('/',myMulter(fileValidation.image).single('image'),validation(validators.createbrand),auth(endpoint.create),createbrand)

 router.put('/:id',myMulter(fileValidation.image).single('image'),validation(validators.updatebrand),auth(endpoint.update),updatebrand)
 router.get("/",auth(endpoint.get),brands)




export default router