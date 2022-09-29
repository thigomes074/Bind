const express = require("express");
const categoryRouter = express.Router();
const CategoryController = require("../controllers/CategoryController");
const auth = require("../middlewares/auth.js");

categoryRouter.get("/", CategoryController.get);
categoryRouter.get("/:id", CategoryController.get);
categoryRouter.post("/", auth, CategoryController.post);
categoryRouter.put("/:id", auth, CategoryController.put);
categoryRouter.delete("/:id", auth, CategoryController.delete);

module.exports = categoryRouter;