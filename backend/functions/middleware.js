import mongoose from "mongoose";
import User from "../models/user.model.js";

// middleware - checking for valid ids
export function isBookIdValid(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }
  next();
}

// middleware - checking for a valid book object (all required fields are present)
export function isBookValid(req, res, next) {
  const book = req.body;
  if (!book.author || !book.title || !book.publisher) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  next();
}

// middleware - checking for a valid user object (all required fields are present)
export function isUserValid(req, res, next) {
  const user = req.body;
  if (!user.name || !user.password || !user.email) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  if (user.password.length < 8) {
    return res
      .status(400)
      .json({ success: false, message: "Provided password is too short" });
  }
  next();
}

// middleware - checking for an existing user with the given name or email
export async function isUserUnique(req, res, next) {
  try {
    var userExists = await User.findOne({ name: req.body.name });
    if (userExists) {
      return res
        .status(411)
        .json({ success: false, message: "Username already exists !" });
    }
    userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(411)
        .json({ success: false, message: "Email already exists !" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
  next();
}

// middleware - check login
export function loginRequired(req, res, next) {
  console.log(req.user);
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
}
