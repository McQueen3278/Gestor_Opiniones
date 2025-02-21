import Post from "./post.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"


export const createPost = async (req, res) => {
    try{
        const data = req.body
        const user = req.usuario

        let postPicture = req.file ? req.file.filename : null;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        data.postPicture = postPicture
        const post = new Post({
            ...data,
            user: user._id
        })

        await post.save();

        const populatedPost = await  Post.findById(post._id).populate('user', 'name')

        res.status(201).json({
            success: true,
            message: "Publicación creada",
            populatedPost
        })

    }catch(err){
        res.status(500).json({
             success: false, 
             message: "Error al hacer publicación", 
             error: err.message 
         })
    }
    
}

const __dirname = dirname(fileURLToPath(import.meta.url))
export const updatePost = async (req, res) => {
    try {
        const { pid } = req.params;
        const data = req.body;
        const user = req.usuario;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        const post = await Post.findById(pid);

        if (post.user.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para actualizar esta publicación',
            });
        }


        if (req.file) {
            data.postPicture = req.file.filename;
        if (post.postPicture) {
            const oldPostPicture = path.join(__dirname, "../../public/uploads/post-pictures", post.postPicture);
            
            try {
                await fs.access(oldPostPicture); 
                await fs.unlink(oldPostPicture);
            } catch (err) {
                console.warn('El archivo no existe o no se pudo eliminar:', oldPostPicture);
            }
        }
    }

        const updatedPost = await Post.findByIdAndUpdate(pid, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Publicación actualizada',
            updatedPost,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la publicación',
            error: err.message,
        });
    }
};


