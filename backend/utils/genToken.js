import jwt from "jsonwebtoken"


const getToken = async (id, res) =>{
    try {
        const token = jwt.sign({id : id}, process.env.SECRET_KEY, {
            expiresIn: "1d"
        })
        res.cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "Strict", // prevents CSRF
            secure: true, // use HTTPS in production
        })
    } catch (error) {
        console.log(error)
    }
}

export default getToken