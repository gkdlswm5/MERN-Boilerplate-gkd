const path = require("path");
const express = require("express");
const router = require("express").Router();

//Load controllers
const { registerController } = require("../controllers/auth.controller.js");

router.post("/register", registerController);

module.exports = router;
