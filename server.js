const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const urlRoutes = require("./routes/url");
require("dotenv").config();

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
require("./models/connect");

const port = 5000 || process.env.PORT;
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.use(urlRoutes);

app.use((req, res) => {
  res.render("error");
});
app.listen(port);
