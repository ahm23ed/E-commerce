import authRouter from './auth/auth.router.js'
import branRouter from './brand/brand.router.js'
import cartRouter from './cart/cart.router.js'
import categoryRouter from './category/category.router.js'
import couponRouter from './coupon/coupon.router.js'
import orderRouter from './order/order.router.js'
import productRouter from './product/product.router.js'
import reviewsRouter from './reviews/reviews.router.js'
import subcategoryRouter from './subcategory/subcategory.router.js'
import userRouter from './user/user.router.js'
//import wishlistRouter from './wishlist/wishlist.router.js'
import express from 'express'



export const appRouter=(app)=>{
    const baseUrl = process.env.BASEURL
    //convert Buffer Data
    app.use(express.json())
    //Setup API Routing 
    app.use(`${baseUrl}/auth`, authRouter)
    app.use(`${baseUrl}/user`, userRouter)
    app.use(`${baseUrl}/product`, productRouter)
    app.use(`${baseUrl}/category`, categoryRouter)
    app.use(`${baseUrl}/subCategory`, subcategoryRouter)
    app.use(`${baseUrl}/reviews`, reviewsRouter)
    app.use(`${baseUrl}/coupon`, couponRouter)
    app.use(`${baseUrl}/cart`, cartRouter)
    app.use(`${baseUrl}/order`, orderRouter)
    app.use(`${baseUrl}/brand`, branRouter)
    
    app.use('*', (req, res, next) => {
        res.send("In-valid Routing Plz check url  or  method")
    })
    
    app.use((err,req,res,next)=>{
        if(err){
            res.status(err['cause']).json({ message: err.message, stack:err.stack })
        }
    })
    
}


