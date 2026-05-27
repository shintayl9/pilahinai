require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./src/config/db");

const predictRoutes = require("./src/routes/predictRoutes");
const { router: historyRoutes } = require("./src/routes/historyRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

// routes
app.use("/history", historyRoutes);
app.use("/predict", predictRoutes);
app.use("/feedback", feedbackRoutes);

// route test
app.get("/", (req, res) => {
    res.send("Back-End EcoSortAI berjalan");
});

pool.connect()
    .then(() => {
        console.log("PostgreSQL connected");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

// jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});