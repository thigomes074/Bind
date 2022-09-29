const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const purchaseRoutes = require("./purchaseRoutes");
const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/", authRoutes);
routes.use("/category", categoryRoutes);
routes.use("/product", productRoutes);
routes.use("/purchase", purchaseRoutes);

// NOT FOUND
routes.use(function (req, res, next) {
	res.status(404);
	return res.json({ error: { message: "The webpage you're trying to reach can't be found." }});
});

module.exports = routes;