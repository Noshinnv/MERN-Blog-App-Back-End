import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from "./router/userRoute.js";
import athenticationRouter from "./router/athenticationRoute.js";
import cookieParser from 'cookie-parser';
import blogRouter from "./router/blogRoute.js";
import checkAutherization from "./middlewear/checkAutherization.js";
import fileUpload from 'express-fileupload';


const app = express();

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to MongoDB database");
    } catch (e) {
        console.log("Failed to connect", e);
    }
};

// middle Wear

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.static("public"));// for image upload
app.use(express.static("file")); //for image upload
app.use(fileUpload({ uriDecodeFileNames: true }));



// declaring routes
app.use("/images", express.static("images"))

app.use("/api/user", userRouter)
app.use("/api/log", athenticationRouter)
app.use("/api/blog", checkAutherization, blogRouter)

// Assingning server to the port

app.listen(process.env.PORT, () => {
    connect();
    console.log("Server is running");
});