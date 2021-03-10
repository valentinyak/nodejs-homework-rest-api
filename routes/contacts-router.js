const express = require("express");
const router = express.Router();

const contactController = require("../controller/contacts-controller");
const guard = require("../helpers/guard");
const contactValidation = require("../validation/contact-validation");

router
  .get("/", guard, contactController.getAllContacts)
  .post(
    "/",
    guard,
    contactValidation.createContact,
    contactController.addContact
  );

router
  .get("/:contactId", guard, contactController.getContactByID)
  .delete("/:contactId", guard, contactController.deleteContact)
  .patch(
    "/:contactId",
    guard,
    contactValidation.updateContact,
    contactController.updateContact
  );

module.exports = router;
