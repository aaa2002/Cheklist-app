const express = require('express');
const router = express.Router();


const Task = require('../models/task');


router.get("/:absoluteDate", (req, res, next) => {
    const tasks = ["task 1", "task 2", "task 3"];
    res.json({ tasks });
  });

module.exports = router;