import mongoose from "mongoose";

/**
 * A model for the user authentication
 */

const AuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Auth", AuthSchema);
