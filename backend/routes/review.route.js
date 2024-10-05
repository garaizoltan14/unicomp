import express from "express";
import {
  deleteReview,
  updateReview,
} from "../controllers/review.controller.js";

const reviewRouter = express.Router();

reviewRouter.patch("/:id", updateReview);

reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
