require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");
const stripe=require("stripe")(process.env.stripe_key);
const path=require('./routes/product_route');
const fetch = require("node-fetch");




const connection = require("./config/db");
require("dotenv").config();
const YOUR_DOMAIN="http://localhost:4200";

// const PORT = process.env.PORT || 5000;
require("dotenv").config();
const endpointSecret = "whsec_363f230890f4bd711fac00d177dc464f5e27ad2e5bb8d166e702ef75857143f7";





connection.once("open", function () {
  console.log("connection established successfully");
});
app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

//Products routes
app.use("/product",path)

const storeProducts=new Map([
  [1,{product_name:'New Apple Airpods(3rd Generation)', price:'299'}]
])

app.post("/payment",async(req,res)=>{
  const product=req.body;
  console.log(req.body);
  console.log(product);
  const session=await stripe.checkout.sessons.create({
    payment_method_types:['card'],
    line_items:[
      {
        price_data:{
          currency:"inr",
          product_data:{
            name:product.product_name,
            images:[product.image]

          },
          unit_amount:product.product_price *100,
        },
        quantity:product.quantity,
      }
    ],
    mode:"payment",
    success_url:`${YOUR_DOMAIN}/success`,
    cancel_url:`${YOUR_DOMAIN}/cancel`
  })
  res.json({
    id:session.id
  })

})
// fetch("/checkout", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   // Send along all the information about the items
//   body: JSON.stringify({
//     items: [
//       {
//           product_name:
//           "New Apple Airpods(3rd Generation)",
//           product_price:
//           "299",
//           description:"Spatial audio with dynamic head tracking places sound all around you Adaptive EQ automatically tunes music to your ears All-new contoured design Force sensor lets you easily control your entertainment, answer or end calls, and more Sweat and water resistant Up to 6 hours of listening time with one charge Up to 30 hours of total listening time with the MagSafe Charging Case Quick access to Siri by saying “Hey Siri” Effortless setup, in-ear detection and automatic switching for a magical experience Easily share audio between two sets of AirPods on your iPhone, iPad, iPod touch or Apple TV",
          
//           id:
//           "SKUD5515AI"
//       }
//     ],
//   }),
// })
//  .then(res => {
//     if (res.ok) return res.json()
//     // If there is an error then make sure we catch that
//     return res.json().then(e => console.error(err))
//   })
//   .then(({ url }) => {
//     // On success redirect the customer to the returned URL
//     window.location = url
//   })
//   .catch(e => {
//     console.error(e.error)
//   })

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js



// This is your Stripe CLI webhook secret for testing your endpoint locally.




const port=process.env.PORT||3000;
app.listen(port,()=>{
  console.log(`listening on port ${port}`);
})