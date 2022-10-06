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
const endpointSecret = process.env.endpointSecret;



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



const port=process.env.PORT||3000;
app.listen(port,()=>{
  console.log(`listening on port ${port}`);
})