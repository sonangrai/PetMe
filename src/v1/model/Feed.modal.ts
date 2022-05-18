import mongoose from "mongoose";

interface Ilike {
  count: number;
  userId: [];
}

interface Imedia {
  public_id: string;
  url: string;
  secure_url: string;
  width: number;
  height: number;
}

export interface Ifeed extends mongoose.Document {
  media: Imedia[];
  description: string;
  userId: string;
  type: number;
  like: Ilike[];
}

const FeedSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
    },
    media: {
      type: Array,
    },
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    type: {
      type: Number,
    },
    commentCount: {
      type: Number,
    },
    like: {
      type: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<Ifeed>("Feed", FeedSchema);
