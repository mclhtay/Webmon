const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

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
  try {
    const player = new Player({
      username: username,
      nickname: nickname,
      gender: gender,
      pokemons: [
        {
          pokemon: {
            name: starter,
            level: 5,
            exp: 10,
          },
        },
      ],
    });
    await player.save();
    res.send({
      msg: "Success",
      nickname: player.nickname,
      gender: player.gender,
      pokemons: player.pokemons,
    });
  } catch (error) {
    console.log(error);
    res.send({
      msg: "Error",
    });
  }
});

module.exports = router;
