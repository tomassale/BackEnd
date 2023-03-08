const express = require("express");
const passport = require("passport");
const upload = require("../lib/multerController");
const userController = require("../controller/userController");

const routerUser = express.Router();

routerUser.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json(req.user);
  }
);

routerUser.post("/login", userController.login);

routerUser.post("/logout", userController.logout);

routerUser.post("/register", upload.single("avatar"), userController.register);

routerUser.get(
  "/user/profile",
  passport.authenticate("jwt", { session: false }),
  userController.getUserProfile
);

module.exports = {routerUser};