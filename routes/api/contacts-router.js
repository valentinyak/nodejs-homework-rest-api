const express = require("express");
const router = express.Router();
const contactController = require("../../controller/contacts-controller");

router
  .get("/", contactController.getAllContacts)
  .post("/", contactController.addContact);

router
  .get("/:contactId", contactController.getContactByID)
  .delete("/:contactId", contactController.deleteContact)
  .patch("/:contactId", contactController.updateContact);

module.exports = router;
