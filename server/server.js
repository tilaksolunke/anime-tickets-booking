const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());

const userRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatersRoute = require("./routes/theaterRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", userRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theaters", theatersRoute);
app.use("/api/bookings", bookingsRoute);
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Node JS server is running on port ${port}`)
);
