import Book from "../models/book.model.js";
import mongoose from "mongoose";

export const createBook = async (req, res) => {
  const book = req.body;
  if (!book.author || !book.title || !book.publisher) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newBook = await Book.create(book);

  try {
    await newBook.save();
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    const book = await Book.findById(id);
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const book = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  if (!book.author || !book.title || !book.publisher) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    const updated = await Book.findByIdAndUpdate(id, book, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  try {
    await Book.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Book deleted" });
    // delete all associated reviews
    // TODO
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
