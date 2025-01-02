import express from "express"
import { allcaptain, allride, alluser, setInactive, updateAdmin } from "../controllers/admin.js"
import adminProtected from "../middlewares/adminProtected.js"
const route = express.Router()

route.get("/allsuer",adminProtected, alluser)

route.post("/update",adminProtected, setInactive)

route.get("/allcaptain",adminProtected, allcaptain)

route.get("/allride",adminProtected, allride)

route.post("/updateadmin",adminProtected, updateAdmin)

export default route