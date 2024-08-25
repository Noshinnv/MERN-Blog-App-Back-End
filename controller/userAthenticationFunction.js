import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const getUser = await userModel.findOne({ username: username });
        if (!getUser) {
            return res.status(404).json({ error: "User name or password not match" });
        }
        const isPasswordMatch = await bcrypt.compare(password, getUser.password);

        if (isPasswordMatch) {

            // genarate token
            const token = jwt.sign({ userId: getUser._id }, process.env.JWT_SECRET);

            return res
                .cookie("token", token, { httpOnly: true })
                .status(200)
                .json({ token: token, message: "Logged in" })
        }
        else {
            return res.status(401).json({ error: "Username or password not match" });
        }

    }
    catch (e) {
        return res.status(500).json({ e: "internal Error" });


    }
};