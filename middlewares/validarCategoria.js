export const validarCategoria =(req, res, next) => {
    const category = req.params.category;

    if(!category || category.trim() === ""){
        return res.status(400).json({erro: "Categoria inválida ou não informada"});
    }

    req.category = category.trim().toLowerCase();
    next();
}