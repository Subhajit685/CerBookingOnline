import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profileImage: {
        type: String
    },
    socketId: {
        type: String
    },
    type: {
        type: String,
        enum: ["user", "captain"],
        default: "user",
        required: true
    },
    admin :{
        type : Boolean,
        default : false
    }

}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User