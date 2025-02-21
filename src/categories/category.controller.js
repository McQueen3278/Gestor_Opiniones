import Category from "./category.model.js"

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    const categories = new Category({
      name,
    });

    await categories.save();

    res.status(201).json({
      success: true,
      message: "Categoría creada exitosamente",
      category: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al crear la categoría",
      error: err.message
    });
  }
}

export const getCategories = async (req, res) => {
  try{
      const { limite = 5, desde = 0 } = req.query
      const query = { status: true }

      const [total, categories ] = await Promise.all([
          Category.countDocuments(query),
          Category.find(query)
              .skip(Number(desde))
              .limit(Number(limite))
      ])

      return res.status(200).json({
          success: true,
          total,
          categories
      })
  }catch(err){
      return res.status(500).json({
          success: false,
          message: "Error al obtener los usuarios",
          error: err.message
      })
  }
}

export const updateCategory = async (req, res) => {
  try {
      const { cid } = req.params;
      const  data  = req.body;
 
      const category = await Category.findByIdAndUpdate(cid, data, { new: true });
 
      res.status(200).json({
          success: true,
          msg: 'Categoria actualizada',
          category
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          msg: 'Error al actualizar la categoria',
          error: err.message
      });
  }
}

export const deleteCategory = async (req, res) => {
  try {
      const { cid } = req.params;



      const categorie = await Category.findByIdAndUpdate(cid,{ status: false },{ new: true });


      return res.status(200).json({
          success: true,
          message: "Categoría eliminada correctamente",
          categorie
      });

  } catch (err) {
      return res.status(500).json({
          success: false,
          message: "Error al eliminar la categoría",
          error: err.message
      });
  }
};