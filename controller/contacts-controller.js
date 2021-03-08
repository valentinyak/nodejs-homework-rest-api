const Contacts = require("../model/contact-model");

const getAllContacts = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const contacts = await Contacts.listContacts(userID);

    res.status(200).json({ status: "success", code: 200, data: contacts });
  } catch (error) {
    next(error);
  }
};

const getContactByID = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const contact = await Contacts.getContactById(req.params.contactId, userID);

    if (contact) {
      res.status(200).json({ status: "success", code: 200, data: contact });
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
};

const addContact = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userID });

    if (contact) {
      res.status(201).json({ status: "success", code: 201, data: contact });
    } else {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required field",
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const contacts = await Contacts.removeContact(req.params.contactId, userID);

    if (contacts) {
      res
        .status(200)
        .json({ status: "success", code: 200, message: "contact deleted" });
    } else {
      res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userID = req.user.id;

    if (JSON.stringify(req.body) !== JSON.stringify({})) {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body,
        userID
      );
      if (contact.id) {
        res.status(200).json({ status: "success", code: 200, data: contact });
      } else {
        res
          .status(404)
          .json({ status: "error", code: 404, message: "Not found" });
      }
    } else {
      res
        .status(400)
        .json({ status: "error", code: 400, message: "missing fields" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactByID,
  addContact,
  deleteContact,
  updateContact,
};
