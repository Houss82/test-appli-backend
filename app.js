require("./models/connection");
var express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var contactRouter = require("./routes/contact");

var app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/contact", contactRouter);

module.exports = app;
