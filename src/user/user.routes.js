import Router from "express";
import { updateProfile, updatePassword } from "./user.controller.js";
import { updateUserValidator, updatePasswordValidator } from "../middlewares/user-validator.js";

const router = Router()

router.put("/updateProfile/:uid", updateUserValidator, updateProfile)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

export default router