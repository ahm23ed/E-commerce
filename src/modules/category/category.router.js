import { Router } from "express";
import { categories, createcategory, updatecategory } from "./controller/category.js";
import {auth} from '../../middleware/auth.js'
import { fileValidation, HME, myMulter } from "../../services/multer.js";
import { validation } from '../../middleware/validation.js'
import * as validators from './category.validation.js'
import { roles } from "../../middleware/auth.js";
import { endpoint } from "./category.endPoint.js";
import subcategoryRouter from '../subcategory/subcategory.router.js'

const router = Router()


router.use("/:categoryId/subcategory",subcategoryRouter)
router.put('/:id',myMulter(fileValidation.image).single('image'),HME,validation(validators.updatecategory),auth(endpoint.updatecategory),updatecategory)
router.post('/',validation(validators.createcategory),auth(endpoint.createcategory),myMulter(fileValidation.image).single('image'),createcategory)
router.get("/",categories)




export default router