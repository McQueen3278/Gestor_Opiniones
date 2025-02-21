import { Router } from "express";
import { createCategory, getCategories, updateCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validator.js";

const router = Router();

/**
 * @swagger
 * /categories/createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "new_category"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Error creating category
 */
router.post("/createCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           example: 5
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: List of categories
 *       500:
 *         description: Error getting categories
 */
router.get("/", getCategories);

/**
 * @swagger
 * /categories/{cid}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category data
 *       500:
 *         description: Error getting category
 */
router.get("/:cid", getCategories);

/**
 * @swagger
 * /categories/updateCategory/{cid}:
 *   put:
 *     summary: Update category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "updated_category"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       500:
 *         description: Error updating category
 */
router.put("/updateCategory/:cid", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /categories/deleteCategory/{cid}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       500:
 *         description: Error deleting category
 */
router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;