const express = require("express");
const { mount } = require("../backend/links");

module.exports = function setup(app) {
  app.use("/api/links", express.json({ limit: "12kb" }));
  mount(app);
};
