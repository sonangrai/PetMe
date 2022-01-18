import mongoose from "mongoose";

/**
 * This model will hold the secret pin codes for sign up and reset pasword
 */

const VerifySchema = new mongoose.Schema9(
  {
    email: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
    },
  },
  { timestamp: true }
);

export default mongoose("Verify", VerifySchema);
