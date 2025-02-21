import { Router } from "express";
import { createPost, updatePost, deletePost, getPostsByCategory } from "./post.controller.js";
import { createPostValidator, updatePostValidator, deletePostValidator } from "../middlewares/post-validator.js";
import { uploadPostPicture } from "../middlewares/multer-uploads.js";

const router = Router()


router.put("/updatePost/:pid",uploadPostPicture.single("postPicture"), updatePostValidator, updatePost )

router.delete("/deletePost/:pid", deletePostValidator, deletePost)
router.get("/postByCategory", getPostsByCategory)
router.post("/createPost", uploadPostPicture.single("postPicture"), createPostValidator, createPost)

export default router