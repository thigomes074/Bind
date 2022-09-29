const db = require("../models/index.js");
const CategoryModel = db.Category;

class CategoryController {
	get = async (req, res, next) => {
		let id = req.params.id;
		try {
			const categories = id ? await CategoryModel.findOne({ where: { id: id }, include: 'products'}) || {} : await CategoryModel.findAll();

			res.status(200);
			return res.json(categories);
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}

	post = async (req, res, next) => {
		try {
			const category = await CategoryModel.create(req.body, { include: [{ association: 'products' }]});

			res.status(201);
			return res.json(category);
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}

	put = async (req, res, next) => {
		let id = req.params.id;
		try {
			if (!await CategoryModel.findByPk(id)) throw "Not found"; 
			await CategoryModel.update(req.body, { where: { id: id } });
			const category = await CategoryModel.findByPk(id);

			res.status(200);
			return res.json(category);
		} catch (error) {
			const err = new Error(error);
			return next(err);	
		}
	}

	delete = async (req, res, next) => {
		let id = req.params.id;
		try {
			if (!await CategoryModel.findByPk(id)) throw "Not found"; 
			await CategoryModel.destroy({ where: { id: id } });

			res.status(204).end();
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}
}

module.exports = new CategoryController;