export const validarId = (req, res, next) => {
    const id = req.params.id;

    if(isNaN){
        return res,stauts(400).json({erro: "O id precisa ser um número válido"});
    }

    req.params = id;
    next();
}