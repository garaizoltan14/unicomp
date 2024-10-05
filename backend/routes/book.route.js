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

const bookRouter = express.Router();

bookRouter.post("/", createBook);

bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBook);

bookRouter.patch("/:id", updateBook);

bookRouter.delete("/:id", deleteBook);

bookRouter.post("/:bookid/reviews", createReview);

bookRouter.get("/:bookid/reviews", getAllReview);

export default bookRouter;
