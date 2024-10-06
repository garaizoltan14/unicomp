import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.ObjectId,
    },
    book: {
      type: mongoose.ObjectId,
    },
    rating: {
      type: String,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      reguired: true,
      minLength: 30,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
