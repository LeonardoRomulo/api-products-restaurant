export const validarPreco = (req, res, next) => {
  const priceString = req.query.price
  
  if (priceString !== undefined) {
    const price = parseFloat(priceString);
    if (isNaN(price) || price < 0) {
      return res
        .status(400)
        .json({ erro: "O preço precisa ser um número válido e positivo" });
    }
    req.price = price;
  }
  next();
};
