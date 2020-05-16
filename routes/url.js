const express = require("express");
const router = express.Router();
const urls = require("../models/url");
require("dotenv").config();

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.EMAIL_KEY,
    },
  })
);

router.get("/check", async (req, res) => {
  const me = await urls.findOne({ short: req.query.username });
  let message;
  if (me) {
    message = "user exists";
  } else {
    message = "user doesn't exist";
  }
  res.json({ message: message });
});

router
  .route("/")
  .get((req, res) => {
    res.render("home", { act: "home" });
  })
  .post(async (req, res) => {
    let { email, long, short } = req.body;
    short = short.trim();
    const newUrl = new urls({ email, long, short });

    const url = await newUrl.save();
    let sage = `${process.env.SITE_NAME}${url.short}`;
    res.render("urldone", {
      act: " ",
      mes: sage,
    });

    if (email) {
      return transporter
        .sendMail({
          to: email,
          from: "awesomewonder553@gmail.com",
          subject: "Thank you for using Url Shortner !",
          html: `<h1>The link to your shortened url:  ${sage} <h1>`,
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

router.get("/:url", async (req, res) => {
  try {
    const find = await urls.findOne({ short: req.params.url });
    if (!find) {
      return res.render("error", { act: " " });
    }
    res.redirect(find.long);
  } catch (e) {
    console.log(e);
    res.render("error", { act: " " });
  }
});

module.exports = router;
