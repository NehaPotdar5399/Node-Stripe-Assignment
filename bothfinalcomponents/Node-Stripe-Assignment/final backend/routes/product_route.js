const router = require("express").Router();
const express = require("express");
const product=require('../controller/controller');
const fetch = require("node-fetch");

const controller = require("../controller/controller");
router.post("/checkout",product.stripeCheckout);

endpoint_secret = 'whsec_363f230890f4bd711fac00d177dc464f5e27ad2e5bb8d166e702ef75857143f7';





// router.post("/checkout", (req,res)=>{
// var myData=new Product(req.body);
// myData.save().then(item=>{
// console.log('item saved to database');
// })
// .catch(err=>{
// res.status(400).send('unable to save to database')});


// });




router.get("/getproducts", product.getProduct);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  product.stripePayment
);



// This is your Stripe CLI webhook secret for testing your endpoint locally.



//Stripe webhook for saving payment details in DB




module.exports = router;