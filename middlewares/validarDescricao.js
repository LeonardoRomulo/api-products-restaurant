export const validarDescricao = (req, res, next) => {
  const description = req.query.description;

  if (description !== undefined) {
    if (!description || description.trim() === "") {
      return res.status(400).json({ erro: "A descrição deve ser informada" });
    }
    req.description = description.trim().toLowerCase();
  }
  next();
};
