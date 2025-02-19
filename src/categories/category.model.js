import { Schema, model } from "mongoose";
 const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
 })

 categorySchema.methods.toJSON = function(){
    const { _id, ...category } = this.toObject();
    category.cid = _id
    return category

 }

 export default model("Category", categorySchema);