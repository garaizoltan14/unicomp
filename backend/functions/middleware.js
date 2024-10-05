import mongoose from "mongoose";

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
