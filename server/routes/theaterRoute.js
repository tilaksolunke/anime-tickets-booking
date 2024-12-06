const router = require("express").Router();
const Theater = require("../models/theaterModel");
const Show = require("../models/showModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add theater
router.post("/add-theater", authMiddleware, async (req, res) => {
  try {
    const newTheater = new Theater(req.body);
    await newTheater.save();
    res.send({
      success: true,
      message: "Theater added successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all theater
router.get("/get-all-theaters", authMiddleware, async (req, res) => {
  try {
    const theaters = await Theater.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Theater fetched successfully.",
      data: theaters,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all theaters by owner
router.post("/get-all-theaters-by-owner", authMiddleware, async (req, res) => {
  try {
    const theaters = await Theater.find({ owner: req.body.owner }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      message: "Theater fetched successfully.",
      data: theaters,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update theater
router.post("/update-theater", authMiddleware, async (req, res) => {
  try {
    await Theater.findByIdAndUpdate(req.body.theaterId, req.body);
    res.send({
      success: true,
      message: "Theater updated successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete theater
router.post("/delete-theater", authMiddleware, async (req, res) => {
  try {
    await Theater.findByIdAndDelete(req.body.theaterId);
    res.send({
      success: true,
      message: "Theater deleted successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// add shows
router.post("/add-show", authMiddleware, async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "Show added successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get  all shows by theater
router.post("/get-all-shows-by-theater", authMiddleware, async (req, res) => {
  try {
    const shows = await Show.find({ theater: req.body.theaterId })
      .populate("movie")
      .sort({
        createdAt: -1,
      });
    res.send({
      success: true,
      message: "Shows fetched successfully.",
      data: shows,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete show
router.post("/delete-show", authMiddleware, async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Shows deleted successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all unique theaters which have a shows of a movie
router.post("/get-all-theaters-by-movie", authMiddleware, async (req, res) => {
  try {
    const { movie, date } = req.body;
    // find all shows of a movie
    const shows = await Show.find({ movie, date })
      .populate("theater")
      .sort({ createdAt: -1 });

    // get all unique theaters
    let uniqueTheaters = [];
    shows.forEach((show) => {
      const theater = uniqueTheaters.find(
        (theater) => theater._id == show.theater._id
      );
      if (!theater) {
        const showsForThisTheater = shows.filter(
          (showObj) => showObj.theater._id == show.theater._id
        );
        uniqueTheaters.push({
          ...show.theater._doc,
          shows: showsForThisTheater,
        });
      }
    });

    res.send({
      success: true,
      message: "Theaters fetched successfully.",
      data: uniqueTheaters,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  } 
});

// get show by id
router.post("/get-show-by-id", authMiddleware, async (req, res) => {
  try {
    const show = await Show.findById(req.body.showId)
      .populate("movie")
      .populate("theater");
    res.send({
      success: true,
      message: "Show fetched successfully",
      data: show,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
