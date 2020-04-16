const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const Leaderboard = require("../models/Leaderboard");

router.get("/", async (req, res) => {
  try {
    const board = await Leaderboard.find();
    res.send({
      msg: "loaded",
      data: board,
    });
  } catch (err) {
    console.log(err);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const leaderboard = new Leaderboard();
//     leaderboard.save();
//     res.send(leaderboard);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
