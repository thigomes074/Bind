const db = require("../models/index.js");
const UserModel = db.User;

class UserController {
	get = async (req, res, next) => {
		let id = req.params.id;
		try {
			const users = id ? await UserModel.findByPk(id) || {} : await UserModel.findAll();

			res.status(200);
			return res.json(users);
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}

	// post = async (req, res, next) => {
	// 	try {
	// 		const user = await UserModel.create(req.body);

	// 		res.status(201);
	// 		return res.json(user);
	// 	} catch (error) {
	// 		const err = new Error(error);
	// 		return next(err);
	// 	}
	// }

	put = async (req, res, next) => {
		let id = req.params.id;
		try {
			if (!await UserModel.findByPk(id)) throw "Not found"; 
			await UserModel.update(req.body, { where: { id: id } });
			const user = await UserModel.findByPk(id);

			res.status(200);
			return res.json(user);
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}

	delete = async (req, res, next) => {
		let id = req.params.id;
		try {
			if (!await UserModel.findByPk(id)) throw "Not found"; 
			await UserModel.destroy({ where: { id: id } });

			res.status(204).end();
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}
}

module.exports = new UserController;