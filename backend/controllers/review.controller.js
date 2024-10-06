import Book from "../models/book.model.js";
import Review from "../models/review.model.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
  try {
    const id = req.params.bookId;
    var review = req.body;

    // check is the user already has a review of the same book
    const existingReview = await Review.findOne({
      owner: req.user._id,
    });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "User already has a review for this book.",
      });
    }

    // create and save review
    const newReview = await Review.create(review);
    newReview.owner = req.user._id;
    newReview.book = id;
    await newReview.save();

    // save review reference in book and update average review rating
    const book = await Book.findById(id);
    if (!book.rating_avg) {
      book.rating_avg = newReview.rating;
    } else {
      book.rating_avg =
        (book.reviews.length * book.rating_avg + parseInt(newReview.rating)) /
        (book.reviews.length + 1);
    }
    book.reviews.push(newReview._id);
    await book.save();

    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllReview = async (req, res) => {
  try {
    const id = req.params.bookId;
    const reviews = await Review.find({ book: id });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = req.body;
    const userId = req.user._id;

    const oldReview = await Review.findById(id);

    // check is user is authorized (the user is the author)
    if (oldReview.owner.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden: not review owner" });
    }

    // update average review rating for the related book if needed
    if (review.rating !== oldReview.rating) {
      const book = await Book.findById(oldReview.book);
      book.rating_avg =
        (book.reviews.length * book.rating_avg -
          parseInt(oldReview.rating) +
          parseInt(review.rating)) /
        book.reviews.length;
      await book.save();
    }

    const updated = await Review.findByIdAndUpdate(id, review, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const review = await Review.findById(id);

    // check is user is authorized (the user is the author)
    if (review.owner.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden: not review owner" });
    }

    // update average review rating for the related book
    const book = await Book.findById(review.book);
    if (book.reviews.length > 1) {
      book.rating_avg =
        (book.reviews.length * book.rating_avg - parseInt(review.rating)) /
        (book.reviews.length - 1);
      book.reviews = book.reviews.filter((e) => e.toString() !== id);
    } else {
      book.reviews = [];
      book.rating_avg = undefined;
    }
    await book.save();

    await Review.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
