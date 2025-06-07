export const validarNome = (req, res, next) => {
    const name = req.query.name;

    if(!name || name.trim() === ""){
        return res.status(400).json({erro: "O nome do produto deve ser informado"})
    };

    req.name = name.trim();
    next();
}