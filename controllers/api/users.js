const { query } = require("express");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

module.exports = {
  create,
  login,
  checkToken,
};

async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code needs to take this into consideration
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
}

async function login(req, res) {
  try {
    const userEmail = req.body.email;
    const providedPassword = req.body.password;
    const user = await User.findOne({ email: userEmail });

    if (user && (await comparePasswords(providedPassword, user.password))) {
      const token = createJWT(user);
      res.json(token); // send back json token that we can use to find the current user
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
}
// notes for login:
//just run bcrypt on entered pw and compare the hashes,
//find a user with the matching credentials using a mongoose query,
// then just create the token
// refer to how user was accessed via token on signup

// if we find a user in the db we create a token and return it as res.json(token)

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}
