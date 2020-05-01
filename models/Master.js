const mongoose = require("mongoose");

const MasterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  one: {
    type: Object,
    name: "",
    stars: "",
    baseStats: [],
    types: [],
    required: true,
  },
  two: {
    type: Object,
    name: "",
    stars: "",
    baseStats: [],
    types: [],
    required: true,
  },
  three: {
    type: Object,
    name: "",
    stars: "",
    baseStats: [],
    types: [],
    required: true,
  },
  action: {
    type: Array,
    required: true,
  },
  matchedTypes: {
    type: Object,
    required: true,
  },
  MP: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = Master = mongoose.model("master", MasterSchema);
