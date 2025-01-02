import bcryptjs from "bcryptjs"
import getToken from "../utils/genToken.js";
import Captain from "../models/captain.js";
import {io} from "../socket.js"


export const create = async(req, res)=>{
    const {fullname, email, password, gender, vehicle, licence} = req.body

    try {
        if(!fullname || !email || !password || !vehicle || !licence){
            return res.status(400).json({success : false, message : 'All fields required'})
        }

        const captian = await Captain.findOne({email})


        if(captian){
            return res.status(400).json({success : false, message : "Captian allready exites"})
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one special character.'
            });
        }

        const haspassword = await bcryptjs.hash(password, 10);

        const newUser = await Captain.create({
            fullname,
            email,
            password : haspassword,
            gender,
            profileImage : "man.png",
            vehicle,
            licence
        })


        getToken(newUser._id, res)


        return res.status(200).json({success : true, captain : newUser})
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req, res)=>{
    const {email, password} = req.body
    try {
        if(!email || !password){
            return res.status(400).json({success : false, message : 'All fields required'})
        }

        const captain = await Captain.findOne({email}).select("+password")

        if(!captain){
            return res.status(400).json({success : false, message : "User not found"})
        }

        const comparePassword = await bcryptjs.compare(password, captain.password)

        if(!comparePassword){
            return res.status(400).json({success : false, message : "Criendital not match"})
        }

        getToken(captain._id, res)


        return res.status(200).json({success : true, captain : captain})

    } catch (error) {
       console.log(error)
    }
}

export const logout = async(req, res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({success : true, message : "Logout successfully"})
    } catch (error) {
        console.log(error)
    }
} 

export const me = async(req, res)=>{
    try {
        return res.status(200).json({success : true, captain : req.user})
    } catch (error) {
        console.log(error)
    }
}

export const updateImage = async (req, res) =>{
    const {id, image} = req.body
    try {
            const user = await Captain.findByIdAndUpdate(id, {
                ProfileImage : image
            })

            if(!user){
                return res.status(400).json({success : false, message : "Captain not found"})
            }

            return res.status(200).json({success : true, message : "Update successfully"})

    } catch (error) {
        console.log(error)
    }
}
