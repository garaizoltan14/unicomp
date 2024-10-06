import express from "express";
import {
  deleteReview,
  updateReview,
} from "../controllers/review.controller.js";
import { isReviewIdValid, loginRequired } from "../functions/middleware.js";

const reviewRouter = express.Router();

reviewRouter.patch("/:id", [loginRequired, isReviewIdValid], updateReview);

reviewRouter.delete("/:id", [loginRequired, isReviewIdValid], deleteReview);

export default reviewRouter;
