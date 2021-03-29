const slugify = require("slugify");
const { Product } = require("../db/models");

exports.productCreate = async (request, response) => {
  try {
    const newProduct = await Product.create(request.body);
    response.status(201).json(newProduct);
  } catch (error) {
    response.status(500).json(error);
    console.log("Failed to create", error.message);
  }
};
exports.productUpdate = async (request, response) => {
  const { id } = request.params;
  try {
    const foundProduct = await Product.findByPk(id);
    await foundProduct.update(request.body);
    response.status(204).end();
    console.log("Product has been updated");
  } catch (error) {
    response.status(404).json(error.message);
    console.log("Product not exist");
  }
};
exports.productDelete = async (request, response) => {
  const { id } = request.params;
  try {
    const foundProduct = await Product.findByPk(id);
    if (foundProduct) {
      await foundProduct.destroy();
      response.status(204).end();
      console.log("Item removed");
    }
  } catch (error) {
    response.status(404).json(error.message);
    console.log("Product not exit");
  }
};
exports.productView = async (_, response) => {
  try {
    const products = await Product.findAll();
    response.json(products);
    console.log("items retrieved", products);
  } catch (error) {
    response.status(500).json("Items not retrieved:", error.message);
  }
};
