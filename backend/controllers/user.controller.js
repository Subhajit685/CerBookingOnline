import User from "../models/user.js";
import bcryptjs from "bcryptjs"
import getToken from "../utils/genToken.js";
import Captain from "../models/captain.js";

export const create = async(req, res)=>{
    const {fullname, email, password, gender} = req.body
    try {
        if(!fullname || !email || !password){
            return res.status(400).json({success : false, message : 'All fields required'})
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({success : false, message : "User allready exites"})
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one special character.'
            });
        }

        const haspassword = await bcryptjs.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            password : haspassword,
            gender,
            profileImage : "man.png"
        })

        getToken(newUser._id, res)

        return res.status(200).json({success : true, user : newUser})
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

        const user = await User.findOne({email}).select("+password")

        if(!user){
            return res.status(400).json({success : false, message : "User not found"})
        }

        const comparePassword = await bcryptjs.compare(password, user.password)

        if(!comparePassword){
            return res.status(400).json({success : false, message : "Criendital not match"})
        }

        getToken(user._id, res)

        return res.status(200).json({success : true, user : user})

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
        return res.status(200).json({success : true, user : req.user})
    }
    catch (error) {
        console.log(error)
    }

}


export const updateImage = async (req, res) =>{
    const {id, image} = req.body
    try {
            const user = await User.findByIdAndUpdate(id, {
                profileImage : image
            })

            if(!user){
                return res.status(400).json({success : false, message : "User not found"})
            }

            return res.status(200).json({success : true, message : "Update successfully"})

    } catch (error) {
        console.log(error)
    }
}