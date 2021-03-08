const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/contacts-router");
const usersRouter = require("./routes/user-router");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app
  .use(logger(formatsLogger))
  .use(cors())
  .use(express.json())
  .use("/api/contacts", contactsRouter)
  .use("/auth", usersRouter)
  .use((req, res) => {
    res.status(404).json({ message: "Not found" });
  })
  .use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
  });

module.exports = app;
