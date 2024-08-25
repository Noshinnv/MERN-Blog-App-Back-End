import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";


export const userSignup = async (req, res) => {
    try {
        const userData = req.body;
        if (userData.password != userData.confirmPassword) {
            return res.status(404).json({ error: "Password didn't match !!" });
        }

        // password confirmation

        const hashedPassword = await bcrypt.hash(userData.password, 2);
        const postUser = await userModel.create({
            ...userData,
            password: hashedPassword
        });
        res.status(200).send(postUser);
    }
    catch (e) {
        console.log(e);
    }
};
export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId)
        res.status(200).json({ success: true, message: "Successfully retrieved user", data: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Failed to retrieve user" });
    }
};