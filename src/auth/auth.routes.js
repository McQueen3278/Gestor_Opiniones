import { Router } from "express";
import { register, login } from "./auth.controller";
import { registerValidator } from "../middlewares/user-validator";
import { uploadProfilePicture } from "../middlewares/multer-uploads";

 const router = Router()

 router.post("/register", uploadProfilePicture.single("profilePicture"), registerValidator, register)

 