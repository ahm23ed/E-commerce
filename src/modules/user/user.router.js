import { Router } from "express";
import { blockAccount, getUserById, softDeleteProfile, updatePassword } from "./controller/user.js";
import { endpoint } from "./user.endPoint.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./user.validation.js"
const router = Router()






router.patch('/updatepassword',validation(validators.updatePassword),auth(endpoint.updatePassword),updatePassword)

router.get('/:id',validation(validators.getuserbyid),auth(endpoint.getUserById),getUserById)
router.patch('/profile/softdelete',validation(validators.softDeleteProfile),auth(endpoint.softDeleteProfile),softDeleteProfile)
router.patch('/Block/:id',validation(validators.blockaccount),auth(endpoint.blockAccount),blockAccount)


export default router