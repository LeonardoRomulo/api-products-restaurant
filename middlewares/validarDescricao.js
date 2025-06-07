export const validarDescricao = (req, res, next) => {
    const description = req.params.description;

    if(!description || description.trim() === ""){
        return res.status(400).json({erro: "A descrição deve ser informada"});
    }

    req.description =description.trim().toLowerCase();

    next();

}