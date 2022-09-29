const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/UserController.js");
const auth = require("../middlewares/auth.js");

userRouter.get("/", UserController.get);
userRouter.get("/:id", UserController.get);
// userRouter.post("/", UserController.post);
userRouter.put("/:id", auth, UserController.put);
userRouter.delete("/:id", auth, UserController.delete);

module.exports = userRouter;