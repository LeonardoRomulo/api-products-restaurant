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
app.get(
  "/products/search",
  validarNome,
  validarCategoria,
  validarDescricao,
  validarPreco,
  (req, res) => {
    let result = [];
    let searchPerformed = false;
    let erroMessage = "";

    if (req.name) {
      result = searchProductsForName(req.name);
      searchPerformed = true;
      if (!result || result.length === 0) {
        erroMessage = "Nenhum produto encontrado com esse nome";
      } 
    }else if (req.category) {
        result = searchForCategory(req.category);
        searchPerformed = true;
        if (!result || result.length === 0) {
          erroMessage = "Nenhum produto encontrado com essa categoria";
        }
      } else if (req.description) {
        result = searchForDescription(req.description);
        searchPerformed = true;
        if (!result || result.length === 0) {
          erroMessage = "Nenhum produto encontrado com essa descrição";
        } 
      }else if (req.price !== undefined) {
          result = searchForPrice(req.price);
          searchPerformed = true;
          if (!result || result.length === 0) {
            erroMessage = " Nenhum produto encontrado até o preço informado";
          }
        }

        if (!searchPerformed) {
          return res
            .status(400)
            .json({
              erro: "Forneça um critério de busca válido (ex: ?name=valor, ?category=valor, ?description= valor ou ?price=valor).",
            });
        }

        if (erroMessage) {
          return res.status(404).json({ erroMessage });
        }
        return res.json(result);
      }
);

//rota para busca dos produtos através do id
app.get("/products/:id", validarId, (req, res) => {
  const product = searchProductsForId(req.id);

  //Validação caso o produto não seja encontrado

  if (!product) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  res.json(product);
});

//- - - - - - - - - - - - - - - - - - - >Create, Update, Delete<- - - - - - - - - - - - - - - //

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
