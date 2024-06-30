

export const asynchandler=(fn)=>{
    return(req,res,next)=> {
        fn(req,res,next).catch(error=>{
            //res.status(500).json({ message: "catch error", error:error.message,stack:error.stack })
            next(new Error (error.message,{cause:500}))
        })

    }
}