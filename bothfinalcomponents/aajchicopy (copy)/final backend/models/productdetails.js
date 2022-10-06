const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let product = new Schema({
    product_id:String,
    product_name : String,
    price:Number,
    images:[String],
    description:String
   
});

module.exports = mongoose.model("products", product);