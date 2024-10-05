import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/book.route.js";
import reviewRouter from "./routes/review.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/reviews", reviewRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http_//localhost:5000");
});
