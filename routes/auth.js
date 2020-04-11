const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const { check, validationResult } = require("express-validator");
//get request for log in user
router.post(
  "/login",
  [
    check("username", "Name is required").not().isEmpty(),
    check("password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.send({ data: "CREDENTIAL_ERROR" });
        return;
      }
      const { username, password } = req.body;
      const user = await User.findOne({ name: username });
      if (!user) {
        res.send({ data: "LOGIN_FAILED" });
        return;
      }
      const validPW = await bcrypt.compare(password, user.password);
      if (validPW) {
        res.send({
          data: "LOGIN_SUCCESS",
          user,
        });
        return;
      } else {
        res.send({ data: "LOGIN_FAILED" });
      }
    } catch (error) {
      res.send({ data: "LOGIN_ERROR" });
    }
  }
);

//register
router.post(
  "/",
  [
    check("username", "Name is required").not().isEmpty(),
    check("password").exists().isLength({ min: "8" }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send("CREDENTIAL_ERROR");
      return;
    }
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ name: username });
      if (user) {
        res.send("USER_FOUND");
        return;
      }
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        name: username,
        password: hash,
        initialized: false,
      });
      await newUser.save();
      res.send("SUCCESS");
    } catch (err) {
      console.log(err);
      res.send("REGISTER_FAILED");
    }
  }
);

//update initialized status
router.put("/:username", async (req, res) => {
  const updated = await User.findOneAndUpdate(
    { name: req.params.username },
    { initialized: true },
    { new: true }
  );
  res.send({
    msg: "Updated",
    stuff: updated,
  });
});

module.exports = router;
