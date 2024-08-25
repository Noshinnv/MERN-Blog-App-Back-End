import blogModel from "../models/blogSchema.js";
import { v4 as uuid } from "uuid";
import { imageUpload } from "../middlewear/imageUpload.js";

export const createBlog = async (req, res) => {
    try {
        let coverImage;
        if (req.files && req.files.image) {
            const imageName = uuid() + req.files.image.name;
            const fileUploadCheck = await imageUpload(imageName, req.files.image);
            if (!fileUploadCheck) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to upload image, please try again!"
                });
            }
            coverImage = imageName; // Set profile image to the filename if upload is successful
        }
        const tags = JSON.parse(req.body.tags || '[]');
        const blog = await blogModel.create({
            ...req.body,
            userId: req.userId,
            coverImage: coverImage,
            tags:tags,
        });

        res.status(200).json({ success: true, message: "Successfully added blog", data: blog });
    } catch (e) {
        console.log(e);
        res.status(400).json({ success: false, message: "Failed to add blog" });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find().populate("userId");
        console.log(blogs);
        res.status(200).json({ success: true, message: "Successfully retrieved blogs", data: blogs });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Failed to retrieve blogs" });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await blogModel.find({userId:req.userId}).populate("userId");
        res.status(200).json({ success: true, message: "Successfully retrieved blog", data: blog });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Failed to retrieve blog" });
    }
};

export const editBlog = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const editBlog = await blogModel.findOneAndUpdate({ _id: id, userId: req.userId }, update);
        res.status(200).json({ success: true, message: "Successfully updated blog", data: editBlog });
    } catch (e) {
        console.log(e);
        res.status(400).json({ success: false, message: "Blog not found or unauthorized to update" });
    }
};
export const deleteBlog = async (req, res) => {
    const id = req.params.id;
    try {
        await blogModel.findOneAndDelete({ _id: id, userId: req.userId });
        res.status(200).json({ success: true, message: "Blog deleted" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ success: false, message: "Blog not found or unauthorized to delete" });
    }
};

export const addComment = async (req, res) => {
    try {
        console.log("kk");

        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Ensure that the comments array exists
        if (!Array.isArray(blog.comments)) {
            blog.comments = [];
        }

        // Add the new comment
        blog.comments.push({
            userId: req.userId,
            content: req.body.content,  // Match this with the frontend
        });

        await blog.save();

        res.status(200).json({ success: true, message: "Successfully added comment", data: blog });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Failed to add comment" });
    }
};
