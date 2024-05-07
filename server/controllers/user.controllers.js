import User from "../models/user.models.js";
import Notification from "../models/notification.models.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { isValidUsername } from "../utility/utils/validUsername.js";

export const userGetUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "username fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.log(
      `userGetUserProfile Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const userFollowUnfollowUser = async (req, res) => {
  try {
    const { followerId } = req.params;
    const userToModify = await User.findById(followerId);
    const currentUser = await User.findById(req.user._id);

    if (followerId === req.user._id.toString()) {
      res.status(400).json({
        status: "error",
        message: "This action is restricted.",
      });
    }

    if (!currentUser || !userToModify) {
      res.status(400).json({
        status: "error",
        message: "User not found",
      });
    }

    const isFollowing = currentUser.followings.includes(followerId);

    if (isFollowing) {
      await User.findByIdAndUpdate(followerId, {
        $pull: { followers: req.user._id },
      });
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { followings: followerId },
      });
      res.status(200).json({
        status: "success",
        message: "User unfollowed successfully",
      });
    } else {
      await User.findByIdAndUpdate(followerId, {
        $push: { followers: req.user._id },
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { followings: followerId },
      });

      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });

      await newNotification.save();

      res.status(200).json({
        status: "success",
        message: "User followed successfully",
      });
    }
  } catch (error) {
    console.log(
      `userFollowUnfollowUser Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const userGetSuggestedProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const userFollowedByMe = await User.findById(userId).select("followings");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
    ]);

    const filteredUser = users.filter(
      (user) => !userFollowedByMe.followings.includes(user._id)
    );

    const suggestedUser = filteredUser.slice(0, 5);
    suggestedUser.forEach((user) => (user.password = null));

    res.status(200).json({
      data: suggestedUser,
    });
  } catch (error) {
    console.log(
      `userGetSuggestedProfile Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const userUpdateProfile = async (req, res) => {
  let {
    fullname,
    username,
    bio,
    websiteurl,
    facebookurl,
    linkedinurl,
    twitterurl,
    githuburl,
    instagramurl,
    profileImage,
    coverImage,
  } = req.body;

  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found",
      });
    }

    if (!isValidUsername(username)) {
      return res.status(400).json({
        status: "error",
        message: "Username is should only contains numbers and letters",
      });
    }

    if (username.length <= 4) {
      return res.status(400).json({
        status: "error",
        message: "Username cannot be too short, try another usernames.",
      });
    }

    const uniqueUser = await User.findOne({ username });
    if (uniqueUser) {
      if (user._id.toString() !== uniqueUser._id.toString()) {
        if (uniqueUser) {
          return res.status(400).json({
            status: "error",
            message: "Username is already taken",
          });
        }
      }
    }

    if (user.profileImage !== profileImage) {
      if (user.profileImage) {
        await cloudinary.uploader.destroy(
          user.profileImage.split("/").pop().split(".")[0]
        );
      }
      const updateProfileImageResponse = await cloudinary.uploader.upload(
        profileImage
      );
      profileImage = updateProfileImageResponse.secure_url;
    }

    if (user.coverImage !== coverImage) {
      if (user.coverImage) {
        await cloudinary.uploader.destroy(
          user.coverImage.split("/").pop().split(".")[0]
        );
      }
      const updateCoverImageResponse = await cloudinary.uploader.upload(
        coverImage
      );
      coverImage = updateCoverImageResponse.secure_url;
    }

    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.websiteurl = websiteurl || user.websiteurl;
    user.githuburl = githuburl || user.githuburl;
    user.facebookurl = facebookurl || user.facebookurl;
    user.twitterurl = twitterurl || user.twitterurl;
    user.instagramurl = instagramurl || user.instagramurl;
    user.linkedinurl = linkedinurl || user.linkedinurl;
    user.profileImage = profileImage || user.profileImage;
    user.coverImage = coverImage || user.coverImage;

    user = await user.save();
    user.password = null;
    return res.status(201).json({
      status: "success",
      message: "User updated successfully!",
      data: user,
    });
  } catch (error) {
    console.log(
      `userUpdateProfile Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const userDeleteProfile = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found",
      });
    }

    await User.updateMany(
      { followings: user._id },
      { $pull: { followings: user._id } }
    );

    await User.updateMany(
      { followers: user._id },
      { $pull: { followers: user._id } }
    );

    await User.findByIdAndDelete(user._id);

    return res.status(201).json({
      status: "success",
      message: "Account deleted successfully!",
    });
  } catch (error) {
    console.log(
      `userDeleteProfile Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
