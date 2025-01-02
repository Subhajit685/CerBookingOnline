import express from "express"
import userProtected from "../middlewares/userProtected.js"
import { getCordinate, getDistance, getSuggestion } from "../controllers/map.controller.js"
import Captain from "../models/captain.js"

const route = express.Router()

route.get("/codrinate", userProtected, async(req, res)=>{
    const {address} = req.query
    try {
        const location = await getCordinate(address)

        return res.status(200).json({success : true, location})
    } catch (error) {
        console.log(error)
    }
})

route.get("/distance", userProtected, async(req, res)=>{
    const {pic, dis} = req.query
    try {

        const distance = await getDistance(pic, dis)

        return res.status(200).json({success : true, distance})
    } catch (error) {
        console.log(error)
    }
})

route.get("/suggestion", userProtected, async(req, res)=>{
    const {input} = req.query
    try {
        const suggestion = await getSuggestion(input)
        return res.status(200).json({success : true, suggestion})
    } catch (error) {
        console.log(error)
    }
})




export default route