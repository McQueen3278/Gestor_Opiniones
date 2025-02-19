import { Router } from "express";
import { createPost } from "./post.controller.js";
import { createPostValidator } from "../middlewares/post-validator.js";
import { uploadPostPicture } from "../middlewares/multer-uploads.js";

const router = Router()

router.post("/createPost", uploadPostPicture.single("postPicture"), createPostValidator, createPost)

export default router