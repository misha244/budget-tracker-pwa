const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const DB_NAME = process.env.DB_NAME || "budget-tracker";
const DB_URL = process.env.MONGODB_URI || `mongodb://localhost/${DB_NAME}`;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(DB_URL, dbOptions);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
