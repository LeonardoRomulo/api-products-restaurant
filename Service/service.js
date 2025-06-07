import  products  from "../data/data.js";

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
  return products.find((product) => product.id === id);
};

//Função que implementa a busca pela descrição
export const searchForDescription = (description) => {
  return products.filter((product) =>
    product.description.toLowerCase().includes(description.toLowerCase())
  );
};

//Função que faz a busca pelo preço
export const searchForPrice = (price) => {
  return products.filter(product => product.price <= productPrice);
};

//função que busca por categoria
export const searchForCategory = (category) => {
  return products.filter((product) => product.category.toLowerCase().includes(category.toLowerCase()));
};

//Funções que permitem adicionar, atualizar e deletar novos produtos (CRUD)

//Adiciona um novo produto
export const addProduct =(newProduct) => {
  const id = products.length > 0 ? products[products.length -1].id + 1 : 1;
  const product = {id,...newProduct};
  products.push(product);
  return product;
};
//atualiza um produto existente
export const updateProduct = (id, updateData) => {
  id = Number(id);
  const index = products.findIndex(p => p.id === id);
  if(index=== -1)  return null;
  products[index] = {...products[index], ...updateData };
  return products[index];
};

//deleta um produto
export const deleteProduct = (id) => {
  id = Number(id);
  const index = products.findIndex(p => p.id === id);
  if(index === -1) return false;
  products.splice(index, 1)
  return true;
}