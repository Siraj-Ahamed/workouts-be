const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
} = require("../controllers/workoutController");

// GET all workouts
router.get("/", getAllWorkouts);

// GET a single workout
router.get("/:id", getSingleWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
