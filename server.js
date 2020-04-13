const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/database");
const PORT = process.env.PORT || 4399;

connectDB();
app.use(express.json({ extended: false }));

app.use("/auth", require("./routes/auth"));
app.use("/webmon", require("./routes/game"));
app.use("/leaderboard", require("./routes/leaderboard"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
