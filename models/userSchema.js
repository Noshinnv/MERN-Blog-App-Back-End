import { Schema, model } from "mongoose";

const userSchema = Schema({
    username: {
        type: String,
        unique : true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
},
    { timestamps: true });

const userModel = model("user", userSchema);

export default userModel;