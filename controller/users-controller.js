const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET_KEY;

const User = require("../model/user-model");

const registerUser = async (req, res, next) => {
  try {
    const user = await User.findUserByEmail(req.body);

    if (!user) {
      const newUser = await User.createUser(req.body);

      return res.status(201).json({
        status: "success",
        code: 201,
        user: { email: newUser.email, subscription: newUser.subscription },
      });
    } else {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findUserByEmail(req.body);

    if (user && (await user.validPassword(req.body.password))) {
      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });

      await User.updateTokenToUser(user.id, { token });

      return res.status(200).json({
        status: "success",
        code: 200,
        user: {
          email: user.email,
          subscription: user.subscription,
          token,
        },
      });
    } else {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong",
      });
    }
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findUserByID(req.user.id);

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }

    await User.updateTokenToUser(user.id, { token: null });

    return res.status(204).json({
      status: "success",
      code: 204,
      message: "No Content",
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findUserByID(req.user.id);

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, logoutUser, getCurrentUser };
