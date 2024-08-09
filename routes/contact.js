const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// Route pour soumettre le formulaire
router.post("/", async (req, res) => {
  try {
    const { name, phone, message } = req.body;
    const newContact = new Contact({ name, phone, message });
    await newContact.save();
    res.status(200).json({ result: true, newContact });
    console.log("Nouvelle demande de contact:", newContact);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'envoi du message" });
  }
});

module.exports = router;
