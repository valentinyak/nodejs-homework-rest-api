const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
    },
    subscription: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
