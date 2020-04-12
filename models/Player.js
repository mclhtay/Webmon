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
          default: 1,
        },
        exp: {
          type: Number,
          default: 0,
        },
        bp: {
          type: Number,
          required: true,
        },
        potential: {
          type: Number,
          required: true,
        },
      },
    },
  ],
  totalBP: {
    type: Number,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
  defaultP: {
    type: String,
    required: true,
  },
  candies: {
    type: Number,
    default: 0,
  },
  bagSize: {
    type: Number,
    default: 10,
  },
});

module.exports = Player = mongoose.model("player", PlayerSchema);
