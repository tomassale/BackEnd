const express = require("express");
const productController = require("../controller/productController.js");
const routerProduct = express.Router();
const passport = require("passport");

routerProduct.get("/", productController.getAll);
routerProduct.get("/:id", productController.getById);

routerProduct.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  productController.save
);

routerProduct.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  productController.update
);

routerProduct.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  productController.deleteById
);

routerProduct.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  productController.deleteAll
);

module.exports = {routerProduct};