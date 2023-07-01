const express = require('express');
const router = express.Router();


const Task = require('../models/task');


router.get("/", (req, res, next) => {
    res.json({"tasks": ["task 1", "task 2", "task  3"] });
});

module.exports = router;