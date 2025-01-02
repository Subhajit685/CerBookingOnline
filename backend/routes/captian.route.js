import express from "express";
import { create, login, logout, me, updateImage} from "../controllers/captain.controller.js"
import captainProtected from "../middlewares/captainProtected.js";
const route = express.Router()


route.post("/create", create)

route.post("/login", login)

route.get("/logout", captainProtected, logout)

route.get("/me", captainProtected, me)

route.post("/uploadImage", captainProtected, updateImage)



export default route