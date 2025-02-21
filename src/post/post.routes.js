import { Router } from "express";
import { createPost, updatePost } from "./post.controller.js";
import { createPostValidator, updatePostValidator } from "../middlewares/post-validator.js";
import { uploadPostPicture } from "../middlewares/multer-uploads.js";

const router = Router()

router.post("/createPost", uploadPostPicture.single("postPicture"), createPostValidator, createPost)

router.put("/updatePost/:pid",uploadPostPicture.single("postPicture"), updatePostValidator, updatePost )
export default router