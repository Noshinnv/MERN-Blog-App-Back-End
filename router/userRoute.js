import express from "express";
import { getUserById, userSignup } from "../controller/userFunction.js";
import checkAutherization from "../middlewear/checkAutherization.js";


const router = express.Router();

router.post("/create", userSignup);
router.get("/getUser", checkAutherization, getUserById);

export default router;