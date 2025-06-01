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

//instanciamento do express
const app = express();

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

app.listen(8080, () => {
    const date = new Date();
    console.log(`Servidor iniciado em ${date}`);
});