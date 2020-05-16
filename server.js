const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

const port = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port);
