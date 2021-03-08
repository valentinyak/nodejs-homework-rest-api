const User = require("./schemas/user-schema");

const createUser = async (body) => {
  const user = new User(body);
  return await user.save();
};

const findUserByEmail = async (body) => {
  return await User.findOne({ email: body.email });
};

const findUserByID = async (userID) => {
  return await User.findById(userID);
};

const updateUserToken = async (userID, token) => {
  return await User.findByIdAndUpdate(userID, token);
};

const updateUserSubscription = async (userID, subscription) => {
  return await User.findByIdAndUpdate(userID, subscription);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByID,
  updateUserToken,
  updateUserSubscription,
};
