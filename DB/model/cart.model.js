import { Schema, model ,Types} from "mongoose";


const cartSchema = new Schema({

    
    
    userId: { type: Types.ObjectId, 
        required:[ true,'coupon cannot be without owner'], 
        ref: 'User',
       unique:true },
    products:{
        type:[{
            productId:{
                type:Types.ObjectId,
                ref:'Product',
                required:true,
                unique:true
            },
            quantity:{
                type:Number,
                default:1,
                required:true 
            }
        }]
    }
       
}, {
    timestamps: true
})


const cartModel = model('Cart',cartSchema)
export default  cartModel