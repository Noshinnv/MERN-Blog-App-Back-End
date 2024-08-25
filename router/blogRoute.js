import express from "express";
import checkAutherization from "../middlewear/checkAutherization.js";
import { addComment, createBlog, deleteBlog, editBlog, getBlogById, getBlogs } from "../controller/blogFunction.js";



const router = express.Router();

router.post("/create", checkAutherization, createBlog);
router.get("/getBlogs", checkAutherization, getBlogs);
router.get("/getBlogById", checkAutherization, getBlogById);
router.put("/editBlog/:id", checkAutherization, editBlog);
router.delete("/deleteBlog/:id", checkAutherization, deleteBlog);
router.post("/addComment/:id", checkAutherization, addComment);


export default router;