const express = require("express");
const router = new express.Router();
const Course = require("../models/course");

router.post("/courses", async (req, res) => {
  const course = new Course(req.body);

  try {
    await course.save();
    res.status(201).send(course);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/courses/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const course = await Course.findById({ _id });

    if (!course) {
      res.status(404).send();
    }

    res.send(course);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
