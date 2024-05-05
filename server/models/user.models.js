import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    followers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    followings: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    profileImage: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    githuburl: {
      type: String,
      default: "",
    },
    facebookurl: {
      type: String,
      default: "",
    },
    linkedinurl: {
      type: String,
      default: "",
    },
    instagramurl: {
      type: String,
      default: "",
    },
    twitterurl: {
      type: String,
      default: "",
    },
    websiteurl: {
      type: String,
      default: "",
    },
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    resetpasswordOtp: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
