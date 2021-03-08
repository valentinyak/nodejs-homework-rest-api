const User = require("./schemas/user-schema");

const createUser = async (body) => {
  // const user = await User.findOne({ email: body.email });
  // if (user) return;
  // return await User.create(body);
  const user = new User(body);
  return await user.save();
};

const findUserByEmail = async (body) => {
  return await User.findOne({ email: body.email });
};

const findUserByID = async (userID) => {
  return await User.findById(userID);
};

const updateTokenToUser = async (userID, token) => {
  return await User.findByIdAndUpdate(userID, token);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByID,
  updateTokenToUser,
};
