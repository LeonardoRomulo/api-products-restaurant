//importação da camada de serviço
import {
  searchProducts,
  searchProductsForName,
  searchProductsForId,
  searchForDescription,
  searchForPrice,
  searchForCategory
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

//rota que retorna toda a coleção de produtos
app.get("/products", (req, res) => {
  res.json(searchProducts());
});
//rota para busca de produtos através do nome
app.get("/products/search/", (req, res) => {
  const name = req.query.name;
  const result = searchProductsForName(name);
  res.json(result);
});
//rota para busca dos produtos através do id
app.get("/products/:id", (req, res) => {
  const product = searchProductsForId(req.params.id);
  res.json(product);
});
//Implementação da busca por descrição
app.get("/products/search/description/",(req,res) => {
    const description = req.query.description; 
    const result = searchForDescription(description);
    res.json(result);
});
//implementação da busca por preço
app.get("/products/search/price/:price", (req,res) => {
  const price = req.params.price;
  const result = searchForPrice(price);
  res.json(result);
});

//implementação da busca por categoria
app.get("/products/search/category/:category", (req,res) => {
   const category = req.params.category;
   const result = searchForCategory(category);
   res.json(result);
});


app.post("/products", (req,res) => {
  const newProduct = req.body;
  const created = addProduct(newProduct);
  res.status(201).json(created);
});

app.put("/products/:id", (req,res) => {
  const id = req.params.id;
  const updateData = req.body;
  const updated = updateProduct(id, updateData);
  updated ? res.json(updated) : res.status(404).json({error:"Produto não encontrado"});
});

app.delete("products/:id", (req,res) => {
  const id = req.params.id;
  const deleted = deleteProduct(id);
  deleted ? res.json({message: "Produto deletado com sucesso"}) : res.status(404).json({error:"Produto não encontrado"})
});

app.listen(8080, () => {
    const date = new Date();
    console.log(`Servidor iniciado em ${date}`);
});