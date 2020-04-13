const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  first: {
    type: Object,
    username: {
      type: String,
      default: "None",
    },
    nickname: {
      type: String,
      default: "None",
    },
    BP: {
      type: Number,
      default: "0",
    },
    pokemon: {
      type: String,
      default: "None",
    },
  },
  second: {
    type: Object,
    username: {
      type: String,
      default: "None",
    },
    nickname: {
      type: String,
      default: "None",
    },
    BP: {
      type: Number,
      default: "0",
    },
    pokemon: {
      type: String,
      default: "None",
    },
  },
  third: {
    type: Object,
    username: {
      type: String,
      default: "None",
    },
    nickname: {
      type: String,
      default: "None",
    },
    BP: {
      type: Number,
      default: "0",
    },
    pokemon: {
      type: String,
      default: "None",
    },
  },
});

module.exports = Leaderboard = mongoose.model("leaderboard", leaderboardSchema);
