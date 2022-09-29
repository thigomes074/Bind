const db = require("../models/index.js");
const UserModel = db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    postLogin = async (req, res, next) => {
        let { username, email, password } = req.body;
        try {
            const user = username ? await UserModel.findOne({ where: { username: username }}) : await UserModel.findOne({ where: { email: email }});

            if (bcrypt.compareSync(password, user.password)) {
                user.dataValues.token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 600 });

                res.status(200);
                return res.json(user);
            } else {
                const err = new Error("Password incorrect.");
                return next(err);
            }
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }

    postSignup = async (req, res, next) => {
        try {
            const user = await UserModel.create(req.body);

            res.status(201);
            return res.json(user);
        } catch (error) {
            const err = new Error(error);
            return next(err);
        }
    }
}

module.exports = new AuthController;