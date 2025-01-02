import jwt from "jsonwebtoken"
import User from "../models/user.js"

const userProtected = async(req, res, next) =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({success : false, message : "Token not found"})
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        if(!decode){
            return res.status(401).json({success : false, message : "Invalid token"})
        }

        const user = await User.findById(decode.id)

        if(!user){
            return res.status(401).json({success : false, message : "Invalid user"})
        }

        req.user = user

        next()
    } catch (error) {
        console.log(error)
    }
}

export default userProtected