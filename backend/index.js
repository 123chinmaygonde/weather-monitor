const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const weatherRoutes = require('./routes/Weather');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.error("Failed to connect to MongoDB", error.message);
});

// Use the weather routes
app.use('/api/weather', weatherRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});