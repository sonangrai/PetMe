import mongoose from "mongoose";

/**
 * This model will hold the secret pin codes for sign up and reset pasword
 */
export interface IVerify extends mongoose.Document {
  email: string;
  secret?: string;
}

const VerifySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IVerify>("Verify", VerifySchema);
