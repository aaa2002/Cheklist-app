const { Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    name: String,
    description: String
})

// Create the model
module.exports = mongoose.model('Task', taskSchema);