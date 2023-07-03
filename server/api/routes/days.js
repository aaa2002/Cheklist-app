const express = require("express");
const router = express.Router();

const Task = require("../models/task");
const mongoose = require("mongoose");

router.get("/:absoluteDate", (req, res, next) => {
  //   const tasks = ["task 1", "task 2", "task 3"];
  //   res.json({ tasks });

  Task.find({ date: req.params.absoluteDate })
    .exec()
    .then((docs) => {
      console.log(docs);
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({ message: "no entries" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/addTask/:absoluteDate", (req, res, next) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    date: req.params.absoluteDate,
    name: req.body.name,
    description: req.body.description,
  });

  task
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /addTask/:absoluteDate",
        createdTask: task,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/deleteTask/:taskID", (req, res, next) => {
  const id = req.params.taskID;
  Task.deleteOne({ _id: id })
    .exec()
    .then((restult) => {
      res.status(200).json(restult);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/updateTask/:taskID", (req, res, next) => {
  const id = req.params.taskID;
  const updateOps = { ...req.body };
  Task.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((restult) => {
      res.status(200).json(restult);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
