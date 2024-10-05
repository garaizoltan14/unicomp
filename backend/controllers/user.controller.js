import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await User.create(user);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (await bcrypt.compare(req.body.password, user.password)) {
      return res.json({
        token: jsonwebtoken.sign(
          { email: user.email, fullName: user.fullName, _id: user._id },
          "UNICOMP"
        ),
      });
    } else {
      return res
        .status(401)
        .json({ message: "Authentication failed. Invalid user or password." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
