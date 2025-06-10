export const validarId = (req, res, next) => {
    const id = parseInt(req.params.id);

    if(isNaN(id) || id <= 0){
        return res.status(400).json({erro: "O id precisa ser um número válido"});
    }

    req.id = id;
    next();
}