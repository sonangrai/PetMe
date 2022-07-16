import mongoose from "mongoose";

/**
 * A model for the user profile
 */
interface Ifollow {
  count: number;
  userId: [];
}
export interface IProfile extends mongoose.Document {
  authId: string;
  firstname: string;
  lastname: string;
  avatar: {
    _id: string;
    url: string;
    secure_url: string;
    width: number;
    height: number;
  };
  bio: string;
  gender: string;
  dob: string;
  address: string;
  contact: string;
  hidenumber: string;
}

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
      type: Object,
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
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
  { timestamps: true }
);

export default mongoose.model<IProfile>("Profile", ProfileSchema);
