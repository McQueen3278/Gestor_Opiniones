import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, roleValidator } from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

 const router = Router()

 router.post("/register", uploadProfilePicture.single("profilePicture"), registerValidator, roleValidator, register)

 router.post("/login", login)

 export default router

 