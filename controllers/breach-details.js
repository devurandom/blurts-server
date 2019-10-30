"use strict";

const HIBP = require("../hibp");
const { changePWLinks } = require("../lib/changePWLinks");

function getBreachDetail(req, res) {

  const allBreaches = req.app.locals.breaches;

  const breachName = req.params.breachName;
  const featuredBreach = HIBP.getBreachByName(allBreaches, breachName);

  if (!featuredBreach) {
    return res.redirect("/");
  }

  const changePWLink = getChangePWLink(featuredBreach);
  res.render("breach-detail", {
    title: req.fluentFormat("home-title"),
    featuredBreach,
    changePWLink,
  });
}

function getChangePWLink(breach) {
  if (!breach.DataClasses.includes("passwords")) {
    return "";
  }

  if (changePWLinks.hasOwnProperty(breach.Name)) {
    return changePWLinks[breach.Name];
  }

  if (breach.Domain) {
    return "https://www." + breach.Domain;
  }

  return "";
}

module.exports = {
  getBreachDetail,
};
