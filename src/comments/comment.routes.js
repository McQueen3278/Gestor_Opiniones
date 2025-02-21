import { Router } from "express";
import { createComment, updateComment, deleteComment } from "./comment.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { hasRoles } from "../middlewares/role-validator.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment management
 */

/**
 * @swagger
 * /comments/addComment:
 *   post:
 *     summary: Add a new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               postId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       500:
 *         description: Error creating comment
 */
router.post("/addComment", validateJWT, hasRoles("USER_ROLE"), createComment);

/**
 * @swagger
 * /comments/updateComment/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 *       403:
 *         description: No permission to update this comment
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error updating comment
 */
router.put("/updateComment/:id", validateJWT, hasRoles("USER_ROLE"), updateComment);

/**
 * @swagger
 * /comments/deleteComment/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       403:
 *         description: No permission to delete this comment
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error deleting comment
 */
router.delete("/deleteComment/:id", validateJWT, hasRoles("USER_ROLE"), deleteComment);

export default router;