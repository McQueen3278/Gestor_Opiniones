import Post from "./post.model.js"
import User from "../user/user.model.js"

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

        res.status(201).json({
            success: true,
            message: "Publicación creada",
            post
        })

    }catch(err){
        res.status(500).json({
             success: false, 
             message: "Error al hacer publicación", 
             error: err.message 
         })
    }
    
}

