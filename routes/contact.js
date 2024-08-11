const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const nodemailer = require("nodemailer");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// Route pour soumettre le formulaire
// Configurer le transporteur de l'email
const transporter = nodemailer.createTransport({
  service: "Gmail", // Utilise le service d'email que tu préfères
  auth: {
    user: process.env.EMAIL_USER, // l'adresse qui envoie les emails)
    pass: process.env.EMAIL_PASS, // mot de passe d'application 2FACTEURS
  },
});

// Fonction pour envoyer un email
const sendEmail = (userDetails) => {
  const dateDue = new Date(userDetails.dateDue);

  const formattedDate = !isNaN(dateDue.getTime())
    ? dateDue.toLocaleDateString("fr-FR") // Format jour/mois/année
    : "Date non spécifiée"; // Valeur par défaut si la date est invalide

  const mailOptions = {
    from: "houssem1982mansour@gmail.com",
    to: "allostore.contact2024@gmail.com", // Ton adresse email
    subject: "Nouvelle demande de devis",
    text: `Nom: ${userDetails.name}\nTéléphone: ${userDetails.phoneNumber}\nEmail: ${userDetails.email}\nMessage: ${userDetails.message}\nDate: ${userDetails.dateDue}`,
  };

  return transporter.sendMail(mailOptions);
};

router.post("/", async (req, res) => {
  try {
    console.log("Début de la route POST /contact");
    const { name, phoneNumber, email, message, dateDue } = req.body;
    const newContact = new Contact({
      name,
      phoneNumber,
      email,
      message,
      dateDue,
    });
    await newContact.save();
    await sendEmail(req.body);
    console.log("Nouvelle demande de contact:", newContact);
    res.status(200).json({ result: true, newContact });
    console.log("Fin de la route POST /contact");
  } catch (error) {
    console.error("Erreur dans la route POST /contact:", error);
    if (error.errors) {
      const errors = Object.values(error.errors).map((err) => err.message);
      res
        .status(500)
        .json({ error: "Erreur lors de l'envoi du message", details: errors });
    } else {
      res.status(500).json({ error: "Erreur lors de l'envoi du message" });
    }
  }
});

module.exports = router;
