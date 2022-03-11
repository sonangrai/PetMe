import mongoose from "mongoose";

interface Ilike {
  count: number;
  userId: [];
}

export interface Ifeed extends mongoose.Document {
  description: string;
  userId: string;
  type: string;
  like: Ilike;
}

const FeedSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    type: {
      type: String,
    },
    like: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Ifeed>("Feed", FeedSchema);
