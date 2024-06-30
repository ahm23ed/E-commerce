import { Router } from "express";
import { myMulter,fileValidation } from "../../services/multer.js";
import { allCategorywithTheirSubcategories, createSubcategory, subcategoryById, updatesubcategory } from "./controller/subcategory.js";
import{auth} from "../../middleware/auth.js"
import { validation } from "../../middleware/validation.js";
import * as validators from "./subcategory.validation.js"
import { endpoint } from "../subcategory/subcategory.endPoint.js";
const router = Router({mergeParams:true})



router.post('/',auth(endpoint.createsubcategory),myMulter(fileValidation.image).single('image'),createSubcategory)
router.put('/:id',auth(endpoint.updatecsubategory),myMulter(fileValidation.image).single('image'),updatesubcategory)
router.get("/allcatgeroies",allCategorywithTheirSubcategories)

router.get("/:id",subcategoryById)


export default router