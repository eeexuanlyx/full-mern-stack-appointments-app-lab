const AuthModel = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const users = await AuthModel.find();

    const outputArray = [];
    for (const user of users) {
      outputArray.push({ email: user.email });
    }
    res.json(outputArray);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: "error", msg: "error getting users" });
  }
};

const register = async (req, res) => {
  try {
    //check duplicate emails //unique email so use findOne instead of id
    const auth = await AuthModel.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }
    //encrypt password
    const hash = await bcrypt.hash(req.body.password, 12);

    //save to db
    await AuthModel.create({
      email: req.body.email,
      hash,
    });

    res.json({ status: "ok", msg: "user created" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    //find a user using email
    const auth = await AuthModel.findOne({ email: req.body.email });
    if (!auth) {
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }
    //validate password
    const result = await bcrypt.compare(req.body.password, auth.hash); //bcrypt returns only true/false
    if (!result) {
      console.error("email or password error");
      return res
        .status(400)
        .json({ status: "error", msg: "email or password error" });
    }
    //jwt (store role, email in claims)
    //claims equvalent to payload
    //take from database as is source of truth
    const claims = {
      email: auth.email,
      userId: auth._id,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "15m",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: "error", msg: "Login failed" });
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET); //if ok return if successful, if invalid throw error
    const claims = { email: decoded.email };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "15m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: "error", msg: "refresh error" });
  }
};

module.exports = { getAllUsers, register, login, refresh };
