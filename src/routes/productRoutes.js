const express = require("express");
const productRouter = express.Router();
const ProductController = require("../controllers/ProductController");
const auth = require("../middlewares/auth.js");

productRouter.get("/", ProductController.get);
productRouter.get("/:id", ProductController.get);
productRouter.post("/", auth, ProductController.post);
productRouter.put("/:id", auth, ProductController.put);
productRouter.delete("/:id", auth, ProductController.delete);

module.exports = productRouter;