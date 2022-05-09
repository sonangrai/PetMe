import mongoose from "mongoose";

interface Ilike {
  count: number;
  userId: [];
}

export interface Icomment extends mongoose.Document {
  feedId: string;
  userId: string;
  comment: string;
  replyTo: string;
  like: Ilike;
}

const CommentSchema = new mongoose.Schema(
  {
    feedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "feed",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    comment: {
      type: String,
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    like: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Icomment>("Feed", CommentSchema);
