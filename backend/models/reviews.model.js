import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    text: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
