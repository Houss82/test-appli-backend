const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nom obligatoire."],
    trim: true,
    minLength: [2, "Le nom doit avoir minimum 2 lettres"],
    maxLength: [50, "Le nom doit avoir maximum 50 lettres"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Numéro de téléphone obligatoire."],
  },
  email: {
    type: String,
    required: [true, "un email est obligatoire"],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Email invalide"],
  },
  message: {
    type: String,
    required: [true, "Message obligatoire"],
  },
  dateDue: { type: Date, default: Date.now },
});

const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
