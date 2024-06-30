import { Schema, model ,Types} from "mongoose";


const productSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        unique: [true, 'name must be unique value'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char'],
        lowercase:true,
        trim:true
    },
    slug:{
        type: String,
        required: [true, 'slug is required']},
    description:{
        type: String,
        required: [true, 'slug is required']},
    images: {
        type: [String],
        required: [true, 'images are required'],
    },
    createdBy: { type: Types.ObjectId, 
        required:[ true,'category cannot be without owner'], 
        ref: 'User' },
    updatedBy: { type: Types.ObjectId, 
        
        ref: 'User' },

    categoryId: { type: Types.ObjectId, 
            required:[ true,'product cannot be without catagory'], 
            ref: 'Category' },

    subcategoryId: { type: Types.ObjectId, 
        required:[ true,'product cannot be without subcatagory'], 
         ref: 'SubCategory' },

    brandId: { type: Types.ObjectId, 
    required:[ true,'product cannot be without brand'], 
    ref: 'Brand' },

    publicImages_id:[String],

    stock:{
        type: Number,
        default:0,
        required: [true, 'start stock is required']},
   solditems:{
        type: Number,
        default:0,
        required: [true, 'solditems is required']},
    amount:{
        type: Number,
        default:0,  
        required: [true, 'amount is required']},
    
    
    price:{
        type: Number,
        required: [true, 'price is required']},
    discount:{
        type: Number,
        default:0,
    },
    finalprice:{
        type: Number,
        required: [true, 'finalprice is required']},
    colors:[String],
    sizes: {type: [String],
    enum:['m','s','l']},

    avgRate:{
        type: Number,
         }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

productSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'productId',
    justOne: true
  });
const producrModel = model('Product',productSchema)
export default producrModel