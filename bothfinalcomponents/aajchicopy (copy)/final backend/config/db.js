const mongoose = require("mongoose");


var uri = "mongodb://localhost:27017/stripeui";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).catch('connection failed');

const connection = mongoose.connection;

module.exports = connection;