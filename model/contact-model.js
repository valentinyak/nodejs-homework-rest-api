const Contact = require("./schemas/contact-schema");

const listContacts = async (userID, { sub = "", limit = 5, page = 1 }) => {
  const results = await Contact.paginate(
    { owner: userID, subscription: sub || null },
    {
      limit,
      page,
      populate: {
        path: "owner",
        select: "email subscription -_id",
      },
    }
  );

  const { docs: contacts, totalDocs: total } = results;

  return { total: String(total), limit, page, contacts };
};

const getContactById = async (contactId, userID) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userID });
  return contact;
};

const removeContact = async (contactId, userID) => {
  const contact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userID,
  });
  return contact;
};

const addContact = async (body, userID) => {
  const contact = await Contact.create(body);
  return contact;
};

const updateContact = async (contactId, body, userID) => {
  const serchedContact = await getContactById(contactId, userID);

  if (serchedContact) {
    const contact = await Contact.findOneAndUpdate(
      {
        _id: contactId,
        owner: userID,
      },
      { ...body },
      { new: true }
    );
    return contact;
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
