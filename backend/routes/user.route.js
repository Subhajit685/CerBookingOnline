import express from "express";
import userProtected from "../middlewares/userProtected.js";
import {create, login, logout, me, updateImage} from "../controllers/user.controller.js"
const route = express.Router()


route.post("/create", create)

route.post("/login", login)

route.get("/logout", userProtected, logout)

route.get("/me", userProtected, me)

route.post("/imageupload", userProtected, updateImage)


export default route