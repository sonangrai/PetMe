import mongoose from "mongoose";

/**
 * A model for the user profile
 */

const ProfileSchema = new mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
    },
    contact: {
      type: String,
    },
    hidenumber: {
      type: String,
      default: 0, // 0 for hide & 1 for show
    },
  },
  { timestamp: true }
);

export default mongoose.model("Profile", ProfileSchema);
