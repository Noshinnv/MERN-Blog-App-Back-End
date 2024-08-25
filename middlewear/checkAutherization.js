import Jwt from "jsonwebtoken";
// import userModel from "../models/userSchema.js";

const checkAutherization = async (req, res, next) => {
    try {

        const token = req.headers.authorization;
        // console.log(token)

        if (!token)
            return res
                .status(400)
                .json({ success: false, message: "You are  not logged in" });
        const dcryptedData = Jwt.verify(token, process.env.JWT_SECRET);

        req.userId = dcryptedData.userId;
        next();
    } catch (error) {
        console.log(error);
    }
};
export default checkAutherization;