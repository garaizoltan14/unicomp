import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    description: { type: String },
    rating_avg: { type: Number },
    price: { type: Number },
    reviews: [mongoose.ObjectId],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
