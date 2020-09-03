const express = require("express");
const app = express();

// load configuration through environment variables from .env to process.env
require("dotenv").config();

// adding compression middleware
var compression = require("compression");

// adding logging middleware
const morgan = require("morgan");

// adding body-parser
const bodyParser = require("body-parser");

// adding cors header for Access-Control-Allow-Origin
const cors = require("cors");

// adding helmet for security
const helmet = require("helmet");

// adding mongoose ODM for mongodb
const mongoose = require("mongoose");

// To handle all deprication warnings from mongoose
// https://mongoosejs.com/docs/deprecations.html
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// connecting to mongodb using mongoclient
mongoose.connect(
  "mongodb://" + process.env.DB_URL + "/" + process.env.DB_NAME,
  {
    useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise;

// enable cors
app.use(cors());

// compress all responses
app.use(compression());

// add routes
const sampleRoutes = require("./api/routes/samples");

// adding static resources
app.use("/images", express.static("{{cookiecutter.data_resources}}"));

// adding helmet
app.use(helmet());

// adding the logger
app.use(morgan("dev"));

// adding the body-parser to handle request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb", extended: true }));

// let express use the specific routes
app.use("/samples", sampleRoutes);

// handling default route errors
app.use((req, res, next) => {
  const error = new Error("Not Found"); // adding your custom error message here
  error.status = 404;
  next(error);
});

// to trigger any above route errors you define, like a 404 page or something
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
