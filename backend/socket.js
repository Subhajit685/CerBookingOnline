import {Server} from "socket.io"
import http from "http"
import express from 'express'
import Captain from "./models/captain.js"
import User from "./models/user.js"

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin : "*",
        methods : ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{

    socket.on("updateSocketID", async(data)=>{
        const {type, id} = data

        if(type === "captain"){
            await Captain.updateOne({_id : id}, {socketId : socket.id})
        }else if(type === "user"){
            await User.updateOne({_id : id}, {socketId : socket.id})    
        }
    })

    socket.on("captainLocation", async(data)=>{
        const{id, location} = data
        await Captain.updateOne({_id : id}, {location : location})
    })

    socket.on("disconnect", ()=>{
        
    })
})

export {io, server, app}