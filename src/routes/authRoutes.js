const express = require("express");
const authRouter = express.Router();
const AuthController = require("../controllers/AuthController.js");

authRouter.post("/login", AuthController.postLogin);
authRouter.post("/signup", AuthController.postSignup);

module.exports = authRouter;