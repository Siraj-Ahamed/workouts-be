const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 }); // descending the data by created date
    res.status(200).json(workouts);
};

// GET a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID is not valid" });
    }

    console.log("params{}:", req.params);
    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(400).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
};

// Create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push("title");
    }
    if (!load) {
        emptyFields.push("load");
    }
    if (!reps) {
        emptyFields.push("reps");
    }

    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Pleas fill in the all the fields", emptyFields });
    }

    // add doc to db
    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(201).json(workout);
    } catch (error) {
        // console.log("Error:", { error: error.message });
        res.status(400).json({ error: error.message });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID is not valid" });
    }

    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
        return res.status(400).json({ error: "No such workout" });
    }

    res.status(200).json({ message: "Workout deleted successfully" });
};

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID is not valid" });
    }

    const workout = await Workout.findByIdAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
    );
    // const updatedWorkout = await Workout.findById(id);

    if (!workout) {
        return res.status(400).json({ error: "No such workout" });
    }

    res.status(200).json({
        message: "Workout updated successfully",
        workout: workout,
    });
};

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
};
