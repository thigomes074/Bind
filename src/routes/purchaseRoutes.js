const express = require("express");
const purchaseRouter = express.Router();
const PurchaseController = require("../controllers/PurchaseController");
const auth = require("../middlewares/auth.js");

purchaseRouter.get("/", PurchaseController.get);
purchaseRouter.get("/:id", PurchaseController.get);
purchaseRouter.post("/", auth, PurchaseController.post);
purchaseRouter.put("/:id", auth, PurchaseController.put);
purchaseRouter.delete("/:id", auth, PurchaseController.delete);

module.exports = purchaseRouter;