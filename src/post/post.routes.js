import { Router } from "express";
import { createPost, updatePost, deletePost, getPostsByCategory } from "./post.controller.js";
import { createPostValidator, updatePostValidator, deletePostValidator } from "../middlewares/post-validator.js";
import { uploadPostPicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Post management
 */

/**
 * @swagger
 * /post/updatePost/{pid}:
 *   put:
 *     summary: Update a post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               postPicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post updated
 *       403:
 *         description: No permission to update this post
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating post
 */
router.put("/updatePost/:pid", uploadPostPicture.single("postPicture"), updatePostValidator, updatePost);

/**
 * @swagger
 * /post/deletePost/{pid}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted
 *       500:
 *         description: Error deleting post
 */
router.delete("/deletePost/:pid", deletePostValidator, deletePost);

/**
 * @swagger
 * /post/postByCategory:
 *   get:
 *     summary: Get posts by category
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: List of posts
 *       500:
 *         description: Error getting posts
 */
router.get("/postByCategory", getPostsByCategory);

/**
 * @swagger
 * /post/createPost:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               postPicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created
 *       500:
 *         description: Error creating post
 */
router.post("/createPost", uploadPostPicture.single("postPicture"), createPostValidator, createPost);

export default router;