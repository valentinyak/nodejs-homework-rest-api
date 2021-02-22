const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();

    res.json({ status: "success", code: 200, data: contacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);

    if (contact) {
      res.json({ status: "success", code: 200, data: contact });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);

    if (contact) {
      res.json({ status: "success", code: 201, data: contact }).status(201);
    } else {
      res
        .json({
          status: "error",
          code: 400,
          message: "missing required field",
        })
        .status(400);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contacts = await Contacts.removeContact(req.params.contactId);

  if (contacts) {
    res
      .json({ status: "success", code: 200, message: "contact deleted" })
      .status(200);
  } else {
    res.json({ status: "error", code: 404, message: "Not found" }).status(404);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  if (JSON.stringify(req.body) !== JSON.stringify({})) {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact.id) {
      res.json({ status: "success", code: 200, data: contact }).status(200);
    } else {
      res
        .json({ status: "error", code: 404, message: "Not found" })
        .status(404);
    }
  } else {
    res
      .json({ status: "error", code: 400, message: "missing fields" })
      .status(400);
  }
});

module.exports = router;
