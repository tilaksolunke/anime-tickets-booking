const express = require('express');
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());

const userRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");

app.use("/api/users", userRoute);
app.use("/api/movies", moviesRoute);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node JS server is running on port ${port}`));