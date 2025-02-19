import { Router } from "express";
import { createCategory } from "./category.controller.js";
import { createCategoryValidator } from "../middlewares/category-validator.js";


const router = Router();

router.post("/createCategory", createCategoryValidator ,createCategory)

export default router;  