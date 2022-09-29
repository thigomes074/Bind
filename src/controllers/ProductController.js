const db = require("../models/index.js");
const ProductModel = db.Product;

class ProductController {
	get = async (req, res, next) => {
		let id = req.params.id;
		try {
			const products = id ? await ProductModel.findOne({ where: { id: id }, include: 'category' }) || {} : await ProductModel.findAll();

			res.status(200);
			return res.json(products);
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}

	post = async (req, res, next) => {
		try {
			const product = await ProductModel.create(req.body, { include: [{ association: 'category' }] });

			res.status(201);
			return res.json(product);
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}

	put = async (req, res, next) => {
		let id = req.params.id;
		try {
			if (!await ProductModel.findByPk(id)) throw "Not found"; 
			await ProductModel.update(req.body, { where: { id: id } });
			const product = await ProductModel.findByPk(id);

			res.status(200);
			return res.json(product);
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}
	
	delete = async (req, res, next) => {
		let id = req.params.id;
		try {
			if (!await ProductModel.findByPk(id)) throw "Not found"; 
			await ProductModel.destroy({ where: { id: id } });

			res.status(204).end();
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}
}

module.exports = new ProductController;