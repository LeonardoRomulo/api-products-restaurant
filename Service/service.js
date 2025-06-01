import { products } from "../data/data.js";

//retorna  todos os produtos
export const searchProducts = () => {
  return products;
};

//função que implementa a busca pelo nome do produto
export const searchProductsForName = (name) => {
  return products.filter((product) =>
    product.name.toLocaleLowerCase().includes(name.toLowerCase())
  );
};

//Função que implementa a busca por id do produto
export const searchProductsForId = (id) => {
  const productId = parseInt(id);
  return products.find((product) => product.id === productId);
};

//Função que implementa a busca pela descrição
export const searchForDescription = (description) => {
  return products.filter((product) =>
    product.description.toLowerCase().includes(description.toLowerCase())
  );
};

//Função que faz a busca pelo preço
export const searchForPrice = (price) => {
  const productPrice = parseFloat(price);
  return products.filter(product => product.price <= productPrice);
};

//função que busca por categoria
export const searchForCategory = (category) => {
  return products.filter((product) => product.category.toLowerCase().includes(category.toLowerCase()));
};
