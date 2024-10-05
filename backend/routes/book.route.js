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
import { isBookIdValid, isBookValid } from "../functions/middleware.js";

const bookRouter = express.Router();

bookRouter.post("/", isBookValid, createBook);

bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", isBookIdValid, getBook);

bookRouter.patch("/:id", [isBookIdValid, isBookValid], updateBook);

bookRouter.delete("/:id", isBookIdValid, deleteBook);

bookRouter.post("/:bookid/reviews", isBookIdValid, createReview);

bookRouter.get("/:bookid/reviews", isBookIdValid, getAllReview);

export default bookRouter;
