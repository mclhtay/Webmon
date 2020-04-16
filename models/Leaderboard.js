const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  phase: {
    type: String,
    default: "Beta",
  },
  first: {
    username: {
      type: String,
      default: "@GMRed",
    },
    nickname: {
      type: String,
      default: "Red",
    },
    BP: {
      type: Number,
      default: 250,
    },
    pokemon: {
      type: String,
      default: "charizard",
    },
  },
  second: {
    username: {
      type: String,
      default: "@GMBlue",
    },
    nickname: {
      type: String,
      default: "Blue",
    },
    BP: {
      type: Number,
      default: 240,
    },
    pokemon: {
      type: String,
      default: "blastoise",
    },
  },
  third: {
    username: {
      type: String,
      default: "@GMYellow",
    },
    nickname: {
      type: String,
      default: "Yellow",
    },
    BP: {
      type: Number,
      default: 200,
    },
    pokemon: {
      type: String,
      default: "pikachu",
    },
  },
});

module.exports = Leaderboard = mongoose.model("leaderboard", leaderboardSchema);
