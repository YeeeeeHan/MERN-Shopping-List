const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// Item Model
const User = require("../../models/User");

// @route post api/users
// @desc Register new user
// @access Public
router.post("/", (req, res) => {
  // Don't put api/items because we are already in that route
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;

// try {
//     const users = await User.find();
//     if (!users) throw Error('No users exist');
//     res.json(users);
// } catch (e) {
//     res.status(400).json({ msg: e.message });
// }
