const db = require("../models/index.js");
const PurchaseModel = db.Purchase;
const ProductModel = db.Product;

class PurchaseController {
	get = async (req, res, next) => {
		let id = req.params.id;
		try {
			const purchases = id ? await PurchaseModel.findOne({ where: { id: id }, include: ['product', 'user'] }) || {} : await PurchaseModel.findAll();

			res.status(200);
			return res.json(purchases);
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}

	post = async (req, res, next) => {
		let product = await ProductModel.findOne({ where: { id: req.body.productId }});
		if (!(product.amount >= req.body.amount)) {
			const err = new Error("This product doesn't have that much");
			return next(err);
		} 

		try {
			await ProductModel.update({ amount: product.amount - req.body.amount }, { where: { id: req.body.productId } });
			const purchase = await PurchaseModel.create({ ...req.body, price: product.price });

			res.status(201);
			return res.json(purchase);
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}

	put = async (req, res, next) => {
		let id = req.params.id;
		try {
			let oldPurchase = await PurchaseModel.findByPk(id);
			if (!oldPurchase) throw "Not found";

			if (oldPurchase.amount != req.body.amount) {
				let product = await ProductModel.findOne({ where: { id: oldPurchase.productId } });

				if (oldPurchase.amount < req.body.amount) {
					if (!(product.amount >=(req.body.amount - oldPurchase.amount))) {
						const err = new Error("This product doesn't have that much");
						return next(err);
					}
					await ProductModel.update({ amount: product.amount - (req.body.amount - oldPurchase.amount) }, { where: { id: oldPurchase.productId } });
				} else {
					await ProductModel.update({ amount: product.amount + (oldPurchase.amount - req.body.amount) }, { where: { id: oldPurchase.productId } });
				}
			}

			await PurchaseModel.update(req.body, { where: { id: id } });
			const purchase = await PurchaseModel.findByPk(id);

			res.status(200);
			return res.json(purchase);
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}

	delete = async (req, res, next) => {
		let id = req.params.id;
		try {
			let purchase = await PurchaseModel.findByPk(id);
			if (!purchase) throw "Not found";

			let product = await ProductModel.findOne({ where: { id: purchase.productId } });
			if (product) {
				await ProductModel.update({ amount: product.amount + purchase.amount }, { where: { id: purchase.productId } });
			}

			await PurchaseModel.destroy({ where: { id: id } });

			res.status(204).end();
		} catch (error) {
			const err = new Error(error);
			return next(err);
		}
	}
}

module.exports = new PurchaseController;