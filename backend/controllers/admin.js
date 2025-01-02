import Captain from "../models/captain.js"
import Ride from "../models/ride.js"
import User from "../models/user.js"


export const allcaptain = async (req, res) =>{
    try {
        const captains = await Captain.find({}).sort({createdAt : -1})
        return res.status(200).json({success : true, captains})
    } catch (error) {
        console.log(error)
    }
}

export const alluser = async (req, res) =>{
    try {
        const users = await User.find({}).sort({createdAt : -1})
        return res.status(200).json({success : true, users})
    } catch (error) {
        console.log(error)
    }
}

export const allride = async (req, res) =>{
    try {
        const rides = await Ride.find({}).sort({createdAt : -1})
        return res.status(200).json({success : true, rides})
    } catch (error) {
        console.log(error)
    }
}

export const setInactive = async (req, res) =>{
    const {id} = req.body
    try {
        const captain = await Captain.findByIdAndUpdate(id, {
            status : "inactive"
        })

        if(!captain) {
            return res.status(400).json({success : false, message : "Captain not found"})
        }

        return res.status(200).json({success : true, message : "Update successfully"})
    } catch (error) {
        console.log(error)
    }
}

export const updateAdmin = async (req, res) =>{
    const {id, type} = req.body
    try {
        if(type === "user"){
            const user = await User.findByIdAndUpdate(id, {
                admin : true
            })

            if(!user){
                return res.status(400).json({success : false, message : "User not found"})
            }

            return res.status(200).json({success : true, message : "Update successfully"})
        }
        if(type === "captain"){
            const user = await Captain.findByIdAndUpdate(id, {
                admin : true
            })

            if(!user){
                return res.status(400).json({success : false, message : "Captain not found"})
            }

            return res.status(200).json({success : true, message : "Update successfully"})
        }

        return res.status(400).json({success : false, message : "All filds required"})
    } catch (error) {
        console.log(error)
    }
}