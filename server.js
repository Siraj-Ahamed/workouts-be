const express = require("express");
// express app
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const PORT = process.env.PORT || 8000;


// middlewares
app.use(express.json());
app.use((req, res, next) => {
    // console.log(req.path, req.method);
    next();
});

// routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // lisren for requests
        app.listen(PORT, () => {
            console.log(`connectes to db & listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Terminate the application
    });
