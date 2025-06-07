//importação da camada de serviço
import {
  searchProducts,
  searchProductsForName,
  searchProductsForId,
  searchForDescription,
  searchForPrice,
  searchForCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./Service/service.js";

//importação dos Middlewares
import { validarNome } from "./middlewares/validarNome.js";
import { validarId } from "./middlewares/validarId.js";
import { validarCategoria } from "./middlewares/validarCategoria.js";
import { validarDescricao } from "./middlewares/validarDescricao.js";
import { validarPreco } from "./middlewares/validarPreco.js";

//importação do express
import express from "express";
import cors from "cors";

//instanciamento do express
const app = express();
//uso do cors
app.use(cors());
//middleware para json
app.use(express.json());

//Rotas

//rota que retorna toda a coleção de produtos
app.get("/products", (req, res) => {
  res.json(searchProducts());
});

//rota para busca de produtos através do nome
app.get("/products/search/", validarNome, (req, res) => {
  const result = searchProductsForName(req.name);

  //Verificando se há produtos encontrados com o nome buscado
  if (!result || result.length === 0) {
    return res
      .status(404)
      .json({ erro: "Nenhum produto encontrado com esse nome" });
  }
  res.json(result);
});

//rota para busca dos produtos através do id
app.get("/products/:id", validarId, (req, res) => {

  const product = searchProductsForId(req.id);

  //Validação caso o produto não seja encontrado

  if (!product) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  res.json(product);
});

//Implementação da busca por descrição
app.get("/products/search/description/", validarDescricao, (req, res) => {
  const result = searchForDescription(req.description);

  //Verificando se foi encontrado algum produto com a descrição fornecida

  if (!result || result.length === 0) {
    return res
      .status(404)
      .json({ erro: `Nenhum produto encontrado com a descrição informada` });
  }

  res.json(result);
});

//implementação da busca por preço
app.get("/products/search/price/:price", validarPreco, (req, res) => {
  const result = searchForPrice(req.price);

  //validando se encontrou algum produto com o preço informado
  if (!result || result.length === 0) {
    return res
      .status(404)
      .json({ erro: "Nenhum produto encontrado até o preço informado" });
  }

  res.json(result);
});

//implementação da busca por categoria
app.get("/products/search/category/:category", validarCategoria, (req, res) => {
  const result = searchForCategory(req.category);

  //Verificando se o produto foi encontrado com a categoria digitada
  if (!result || result.length === 0) {
    return res
      .status(404)
      .json({ erro: "Nenhum produto encontrado nessa categoria" });
  }
  res.json(result);
});

//- - - - - - - - - - - - - - - - - - - ><- - - - - - - - - - - - - - - //

//Cadastro de novos produtos na API+
app.post("/products", (req, res) => {
  const newProduct = req.body;
  const created = addProduct(newProduct);
  res.status(201).json(created);
});

//Atualização de dados da api
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const updated = updateProduct(id, updateData);
  updated
    ? res.json(updated)
    : res.status(404).json({ error: "Produto não encontrado" });
});

// Delete: (exclussão de dados da api)
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const deleted = deleteProduct(id);
  deleted
    ? res.json({ message: "Produto deletado com sucesso" })
    : res.status(404).json({ error: "Produto não encontrado" });
});

//porta em que o servidor vai ser rodado
app.listen(8080, () => {
  const date = new Date();
  console.log(`Servidor iniciado em ${date}`);
});
