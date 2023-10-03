const express = require("express");
const app = express();
const contactRouter = require("../src/routes/contactrouter");
const userRouter = require("../src/routes/userRouter");
const mongodb = require("./config/mongodb");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { errorHandler } = require("./helpers/error/errorHandler");

mongodb();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorHandler);

app.use("/", contactRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
  res.status(404).json({
    error: "bad request",
  });
});

module.exports = app;
