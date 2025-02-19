import { Schema, model } from "mongoose";

const postsSchema = Schema({
    title: {
        type: String
    },
    postPicture: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Post", postsSchema)