const express = require("express");
const router = express.Router();
const urls = require("../models/url");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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 ",
    },
  })
);

router
  .route("/")
  .get((req, res) => {
    res.render("home");
  })
  .post(async (req, res) => {
    const { email, long, short } = req.body;
    const newUrl = new urls({ email, long, short });
    const url = await newUrl.save();
    console.log(url);

    return transporter
      .sendMail({
        to: email,
        from: "awesomewonder553@gmail.com",
        subject: "Signup succeeded bitch !",
        html: "<h1>You successfully signed up!</h1>",
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.get("/:url", async (req, res) => {
  try {
    const find = await urls.findOne({ short: req.params.url });
    if (!find) {
      return res.render("error");
    }
    res.redirect(find.long);
  } catch (e) {
    console.log(e);
    res.render("error");
  }
});

module.exports = router;
