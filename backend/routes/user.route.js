import express from "express";
import {
  createUser,
  getUser,
  loginUser,
} from "../controllers/user.controller.js";
import {
  isUserUnique,
  isUserValid,
  loginRequired,
} from "../functions/middleware.js";

const userRouter = express.Router();

userRouter.post("/", [isUserValid, isUserUnique], createUser);

userRouter.post("/login", loginUser);

userRouter.get("/me", loginRequired, getUser);

export default userRouter;
