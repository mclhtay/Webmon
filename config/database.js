const mongoose = require("mongoose");
const config = require("config");

const mongo = config.get("mongoCONNECT");

const connectDB = async () => {
  try {
    await mongoose.connect(mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Mongoose connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
