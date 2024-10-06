import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/book.controller.js";
import {
  createReview,
  getAllReview,
} from "../controllers/review.controller.js";
import {
  isBookIdValid,
  isBookValid,
  isReviewValid,
  loginRequired,
} from "../functions/middleware.js";

const bookRouter = express.Router();

bookRouter.post("/", isBookValid, createBook);

bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", isBookIdValid, getBook);

bookRouter.patch("/:id", [isBookIdValid, isBookValid], updateBook);

bookRouter.delete("/:id", isBookIdValid, deleteBook);

bookRouter.post(
  "/:bookId/reviews",
  [loginRequired, isBookIdValid, isReviewValid],
  createReview
);

bookRouter.get("/:bookId/reviews", isBookIdValid, getAllReview);

export default bookRouter;
