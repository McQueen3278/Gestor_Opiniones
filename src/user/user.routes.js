import Router from "express";
import { updateProfile, updatePassword, updateProfilePicture } from "./user.controller.js";
import { updateUserValidator, updatePasswordValidator, updateProfilePictureValidator} from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router()

router.put("/updateProfile/:uid", updateUserValidator, updateProfile)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)

export default router