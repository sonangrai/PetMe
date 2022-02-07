import mongoose from "mongoose";

/**
 * A model for the user authentication
 */
export interface IAuth extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  status: string;
}
const AuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 0, // 0 = Unactivated (Default), 1 = Activated, 2 = Paused
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAuth>("Auth", AuthSchema);
