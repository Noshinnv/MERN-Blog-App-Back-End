import { Schema, model } from "mongoose";

// Define the comment schema
const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,   // Reference to the user who made the comment
        ref: "user",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Define the blog schema
const blogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
    tags: {
        type:[String],
        default: []
    }
}, { timestamps: true });

const blogModel = model("blog", blogSchema);

export default blogModel;