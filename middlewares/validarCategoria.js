export const validarCategoria =(req, res, next) => {
    const category = req.query.category;
    
    if(category !== undefined){
        if(!category || category.trim() === ""){
            return res.status(400).json({erro: "Categoria inválida ou não informada"});
        }
        req.category = category.trim().toLowerCase();
    }
    next();
}
