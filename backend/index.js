import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/bdConnceted.js";
import userRoute from "./routes/user.route.js";
import captainRoute from "./routes/captian.route.js"
import mapsRoute from "./routes/map.route.js"
import rideRoute from "./routes/ride.js"
import adminRoute from "./routes/admin.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"
import {app, server} from "./socket.js"

const PORT = process.env.PORT || 4000;

dotenv.config();
dbConnection()

const __dirname = path.resolve()


app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use(express.static("/public"))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use("/user", userRoute)
app.use("/captain", captainRoute)
app.use("/map", mapsRoute)
app.use("/ride", rideRoute)
app.use("/admin", adminRoute)

app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})


server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})