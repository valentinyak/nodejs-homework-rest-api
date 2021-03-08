const express = require("express");
const router = express.Router();

const userController = require("../controller/users-controller");
const guard = require("../helpers/guard");
const userValidation = require("../validation/user-validation");

router
  .post("/register", userValidation.createUser, userController.registerUser)
  .post("/login", userController.loginUser)
  .post("/logout", guard, userController.logoutUser)
  .get("/users/current", guard, userController.getCurrentUser);

module.exports = router;
