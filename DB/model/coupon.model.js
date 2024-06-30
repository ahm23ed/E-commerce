import { Schema, model ,Types} from "mongoose";


const couponSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        unique: [true, 'name must be unique value'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char'],
        lowercase:true,
        trim:[true]
    },
    
    createdBy: { type: Types.ObjectId, 
        required:[ true,'coupon cannot be without owner'], 
        ref: 'User' },
    updatedBy: { type: Types.ObjectId, 
        ref: 'User' },
    deletedBy: { type: Types.ObjectId,
        ref: 'User' },

    deleted:{type:Boolean,
    default:false},
    usedBy: [{type: Types.ObjectId, 
        ref: 'User'}]  ,
    amount:{type:Number,
    default:1,
    min:[1,'min discount 1%'],
    max:[100,'max discount 1000%']},
    expireDate:{type:Date,
    required:true}
       
}, {
    timestamps: true
})


const couponModel = model('Coupon',couponSchema)
export default  couponModel