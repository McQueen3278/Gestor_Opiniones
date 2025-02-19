import Category from "./category.model.js"

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    

    console.log('Cuerpo de la solicitud:', req.body);
    
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
      error: err.message,
    });
  }
}