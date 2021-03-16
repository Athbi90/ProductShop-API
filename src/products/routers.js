const express = require("express");
const router = express.Router();
const {
  productCreate,
  productUpdate,
  productDelete,
  productView,
} = require("./controllers");

router.get("/products", productView);

router.delete("/products/:id", productDelete);

router.post("/products", productCreate);

router.put("/products/:id", productUpdate);

module.exports = router;
