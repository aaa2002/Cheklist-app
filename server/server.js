const express = require ('express');
const app = express();
const mongoose = require("mongoose");
const dayRoutes = require('./api/routes/days.js');
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(express.json());

const {response} = require("express");

mongoose.connect('mongodb+srv://aaa:aaa@checklist.btdjiz8.mongodb.net/?retryWrites=true&w=majority&useUnifiedTopology=true',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.use('/day', dayRoutes);

app.listen(5000, () => {console.log("###    Up and running!\n###    Port: 5000")})