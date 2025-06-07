export const validarPreco = (req, res, next) => {
    const price = parseFloat(req.params.price);
    if(isNaN(price)){
        return res.status(400).json({erro:"O preço precisa ser um número válido"});
    }
    req.price = price;
    next();
}