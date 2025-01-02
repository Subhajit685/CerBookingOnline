import mongoose, { model } from "mongoose";

const captainSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    password: {
        type: String,
        required: true
    },
    ProfileImage: {
        type: String
    },
    socketId: {
        type: String
    },
    vehicle: {
        vehicleType: {
            type: String,
            enum: ["car", "bike", "auto"],
            required: true
        },
        color: {
            type: String,
            required: true
        },
        numberPalte: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        model: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    type: {
        type: String,
        required: true,
        default: "captain"
    },
    licence: {
        type: String,
        required: true
    }, 
    admin :{
        type : Boolean,
        default : false
    }

}, { timestamps: true })

const Captain = mongoose.model("Captain", captainSchema)

export default Captain