const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  pokemons: [
    {
      pokemon: {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: Number,
          required: true,
        },
        exp: {
          type: Number,
          required: true,
        },
      },
    },
  ],
});

module.exports = Player = mongoose.model("player", PlayerSchema);
