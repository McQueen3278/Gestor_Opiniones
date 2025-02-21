import Router from "express";
import { updateProfile, updatePassword, updateProfilePicture } from "./user.controller.js";
import { updateUserValidator, updatePasswordValidator, updateProfilePictureValidator, roleValidator } from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.put("/updateProfile", updateUserValidator, roleValidator, updateProfile);

router.patch("/updatePassword", updatePasswordValidator, updatePassword);

router.patch("/updateProfilePicture", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture);

export default router;