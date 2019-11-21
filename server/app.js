const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const authRoutes = require("./routes/auth");
const settingsRouter = require("./routes/settings");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use(authRoutes);
app.use("/settings", settingsRouter);

// Error handler
app.use(function(err, req, res, next) {
  res.status(401).send({ success: false, error: err })
});

app.listen(4000, () => {
  console.log("Server running on port 4000!");
});

module.exports = app;
