import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { addReview, deleteReview, Getallreviewsofspecificproduct, updateReview } from "./controller/review.js";
import { endpoint } from "./reviews.endPoint.js";
const router = Router({mergeParams:true})





router.post('/', auth(endpoint.create),addReview)
router.patch('/:id', auth(endpoint.update),updateReview)
router.delete('/:id', auth(endpoint.update),deleteReview)
router.get('/', auth(endpoint.update),Getallreviewsofspecificproduct)


export default router