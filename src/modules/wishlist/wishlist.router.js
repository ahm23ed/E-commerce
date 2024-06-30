import { Router } from "express";

import { endpoint } from "./wishlist.endpoint.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { add, remove } from "./controller/wishlist.js";
//import * as validators from "./user.validation.js"
const router = Router({mergeParams:true})






router.patch('/add',auth(endpoint.add),add)
router.patch('/remove',auth(endpoint.remove),remove)



// router.get('/:id',validation(validators.getuserbyid),auth(endpoint.getUserById),getUserById)
// router.patch('/profile/softdelete',validation(validators.softDeleteProfile),auth(endpoint.softDeleteProfile),softDeleteProfile)
// router.patch('/Block/:id',validation(validators.blockaccount),auth(endpoint.blockAccount),blockAccount)


export default router