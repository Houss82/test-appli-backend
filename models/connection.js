const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://mansourhoussem1982:0LshwJSY0rc7rFQ1@cluster0.5lywams.mongodb.net/appli-test";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected 👍"))

  .catch((error) => console.error(error));
