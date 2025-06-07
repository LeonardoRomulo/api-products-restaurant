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
  deleteProduct
} from "./Service/service.js";

//importação do express
import express from 'express';
import cors from 'cors';

//instanciamento do express
const app = express();
//uso do cors
app.use(cors());
//middleware para json
app.use(express.json());

//Rotas

//- - - - - - - - - - - - - - - - - - - ><- - - - - - - - - - - - - - - //

//Cadastro de novos produtos na API+
app.post("/products", (req,res) => {
  const newProduct = req.body;
  const created = addProduct(newProduct);
  res.status(201).json(created);
});

//Atualização de dados da api
app.put("/products/:id", (req,res) => {
  const id = req.params.id;
  const updateData = req.body;
  const updated = updateProduct(id, updateData);
  updated ? res.json(updated) : res.status(404).json({error:"Produto não encontrado"});
});

// Delete: (exclussão de dados da api)
app.delete("/products/:id", (req,res) => {
  const id = req.params.id;
  const deleted = deleteProduct(id);
  deleted ? res.json({message: "Produto deletado com sucesso"}) : res.status(404).json({error:"Produto não encontrado"})
});

//porta em que o servidor vai ser rodado
app.listen(8080, () => {
    const date = new Date();
    console.log(`Servidor iniciado em ${date}`);
});