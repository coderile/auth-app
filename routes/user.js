//import express
//create router using express.Router
//design the URL with authentication
const express = require("express");
const { authenticateBody, schema } = require("../helpers/routeHelper");
//Controoler import

const userController = require("../controller/user");

const router = express.Router();

router
  .route("/signup")
  .post(authenticateBody(schema.authSchema), userController.signUp);
router
  .route("/signin")
  .post(authenticateBody(schema.authSchema), userController.signIn);
router.route("/secret").get(userController.secret);

module.exports = router;
