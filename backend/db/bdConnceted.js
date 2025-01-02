import mongoose from "mongoose";

const dbConnection = async() =>{
    try {
        mongoose.connect(process.env.DATA_BASE_URL).then(()=>{
            console.log("Database connected")
        })
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection