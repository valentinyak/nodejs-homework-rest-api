const fs = require("fs/promises");
const path = require("path");
const contacts = require("./contacts.json");
const Joi = require("joi");
const { v4: uuid } = require("uuid");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  return contacts.find((contact) => String(contact.id) === contactId);
};

const removeContact = async (contactId) => {
  const serchedContact = contacts.find(
    (contact) => String(contact.id) === contactId
  );

  if (serchedContact) {
    const updatedContacts = contacts.filter(
      (contact) => String(contact.id) !== contactId
    );

    fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(updatedContacts)
    );

    return updatedContacts;
  }
};

const addContact = async (body) => {
  const contact = schema.validate({
    name: body.name,
    email: body.email,
    phone: body.phone,
  });

  if (contact.error) {
    console.log(contact.error.details[0].message);
  } else {
    const updatedContact = { ...contact.value, id: uuid() };
    const updatedContacts = [...contacts, updatedContact];

    fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(updatedContacts)
    );

    return updatedContact;
  }
};

const updateContact = async (contactId, body) => {
  const serchedContact = contacts.find(
    (contact) => String(contact.id) === contactId
  );

  if (serchedContact) {
    const updatedContact = { ...serchedContact, ...body };
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== serchedContact.id
    );

    const updatedContacts = [...filteredContacts, updatedContact];

    fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(updatedContacts)
    );

    return updatedContact;
  } else {
    return {};
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
