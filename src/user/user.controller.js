import { hash, verify } from "argon2"
import User from "./user.model.js";
import fs from "fs/promises"
import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management
 */

/**
 * @swagger
 * /user/updateProfile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       500:
 *         description: Error updating user
 */
export const updateProfile = async (req, res) => {
    try {
        const usuario = req.usuario;
        const  data  = req.body;

        const user = await User.findByIdAndUpdate(usuario._id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
}

/**
 * @swagger
 * /user/updatePassword:
 *   put:
 *     summary: Update user password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 *       400:
 *         description: New password cannot be the same as the old password
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating password
 */
export const updatePassword = async (req, res) => {
    try {
        const usuario = req.usuario;
        const { newPassword, password } = req.body;

        const user = await User.findById(usuario._id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }

        const PasswordCorrect = await verify(user.password, password); 

        if (!PasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Contraseña incorrecta, no se puede proceder con la actualización de la contraseña",
            });
        }

        const matchOldAndNewPassword = await verify(user.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(usuario._id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
}

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @swagger
 * /user/updateProfilePicture:
 *   put:
 *     summary: Update user profile picture
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated
 *       400:
 *         description: No file in request
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating profile picture
 */
export const updateProfilePicture = async (req, res) => {
    try {
        const usuario = req.usuario; 
        const newProfilePicture = req.file ? req.file.filename : null; 

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                message: "No hay archivo en la petición",
            });
        }

        const user = await User.findById(usuario._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }

        if (user.profilePicture) {
            const oldProfilePicture = path.join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
            try {
                await fs.unlink(oldProfilePicture); 
            } catch (err) {
                console.error('Error al eliminar la imagen anterior:', err);
            }
        }
        user.profilePicture = newProfilePicture
        await user.save(); 

        return res.status(200).json({
            success: true,
            message: "Foto actualizada",
            profilePicture: user.profilePicture,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la foto",
            error: err.message,
        });
    }
};