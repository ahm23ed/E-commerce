import { Schema, model ,Types} from "mongoose";


const reviewSchema = new Schema({

    comment: {
        type: String,
    },
    starsNum:{type:Number,
    
        required:true,
       min:[1,'min rating 1'],
       max:[5,'max rating 5']
    },
    productId: { type: Types.ObjectId, 
        required:[ true,'review cannot be without product'], 
        ref: 'Product' },

    createdBy: { type: Types.ObjectId, 
        required:[ true,'review cannot be without owner'], 
        ref: 'User' },
    updatedBy: { type: Types.ObjectId, 
        ref: 'User' },
    deletedBy: { type: Types.ObjectId,
        ref: 'User' },

    deleted:{type:Boolean,
    default:false},
    
    
       
}, {
    timestamps: true
})


const reviewModel = model('Review',reviewSchema)
export default  reviewModel