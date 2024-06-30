import { Schema, model ,Types} from "mongoose";


const orderSchema = new Schema({

    userId: { type: Types.ObjectId, 
        required:[ true,'coupon cannot be without owner'], 
        ref: 'User',
      // unique:true 
    },
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
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    totalprice:{
        type:Number,
        required:true
    },
    finalprice:{
        type:Number,
        required:true
    },
    couponId:{
        type: Types.ObjectId, 
        ref: 'Coupon',
    },
    status:{
        type:String,
        enum:['placed','recieved','preparing','onWay','rejected'],
        default:'placed'
    },
    payment:{
        type:String,
        enum:['cash','visa'],
        default:'cash'
    }
       
}, {
    timestamps: true
})


const orderModel = model('Order',orderSchema)
export default  orderModel