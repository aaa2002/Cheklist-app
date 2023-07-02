const express = require ('express');
const mongoose = require("mongoose");
const cors = require ('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');




const app = express();
app.use(express.json());
app.use(cors());

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

const dayRoutes = require('./api/routes/days.js');

app.use('/day', dayRoutes);

app.listen(5000, () => {console.log("###    Up and running!\n###    Port: 5000")})