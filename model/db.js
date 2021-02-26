const mongoose = require("mongoose");
require("dotenv").config();
const uriDB = process.env.URI_DB;

mongoose.connect(uriDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from db");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection for db closed and app terminated");
  process.exit(1);
});

module.exports = db;
