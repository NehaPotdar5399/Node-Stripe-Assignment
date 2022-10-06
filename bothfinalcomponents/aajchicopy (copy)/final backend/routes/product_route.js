const router = require("express").Router();
const express = require("express");
const product=require('../controller/controller');
const fetch = require("node-fetch");

const controller = require("../controller/controller");
router.post("/checkout",product.stripeCheckout);

endpoint_secret = process.env.endpoint_secret;
router.get("/getproducts", product.getProduct);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  product.stripePayment
);

module.exports = router;