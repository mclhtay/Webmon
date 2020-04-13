const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const Leaderboard = require("../models/Leaderboard");
// /webmon

router.get("/:name", async (req, res) => {
  const player = await Player.findOne({ username: req.params.name });

  if (!player) {
    res.send({
      msg: "No Player",
    });
  } else {
    res.send({
      msg: "Yes Player",
      content: player,
    });
  }
});

router.post("/", async (req, res) => {
  const { username, nickname, gender, starter } = req.body;
  const randomPotential = Math.floor(Math.random() * 6) + 5;
  try {
    const player = new Player({
      username: username,
      nickname: nickname,
      gender: gender,
      pokemons: [
        {
          pokemon: {
            name: starter,
            bp: randomPotential,
            potential: randomPotential,
          },
        },
      ],
      totalBP: randomPotential,
      coins: 500,
      defaultP: starter,
    });
    await player.save();
    res.send({
      msg: "Success",
      nickname: player.nickname,
      gender: player.gender,
      pokemons: player.pokemons,
      totalBP: player.totalBP,
      coins: player.coins,
      candies: player.candies,
    });
  } catch (error) {
    console.log(error);
    res.send({
      msg: "Error",
    });
  }
});

router.get("/leaderboard", async (req, res) => {
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

module.exports = router;
