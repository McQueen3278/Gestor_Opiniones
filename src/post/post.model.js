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

postsSchema.methods.toJSON = function(){
    const {_id, ...post} = this.toObject()
    post.pid = _id
    return post
}

export default model("Post", postsSchema)