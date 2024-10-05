import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: Number,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    description: { type: String },
    rating_avg: { type: Number },
    price: { type: Number },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
