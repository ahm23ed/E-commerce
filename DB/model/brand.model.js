import { Schema, model ,Types} from "mongoose";


const brandSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        unique: [true, 'name must be unique value'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char'],
        lowercase:true,
        trim:[true]
    },
    slug:String,
    image: {
        type: String,
        required: [true, 'image is required'],
    },
    createdBy: { type: Types.ObjectId, 
        required:[ true,'category cannot be without owner'], 
        ref: 'User' },
        publicImage_id:String,
}, {
    timestamps: true
})


const brandModel = model('Brand',brandSchema)
export default brandModel