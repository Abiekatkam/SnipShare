import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utility/utils/generateTokenAndSetCookie.js";

export const authRegister = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    const emailRegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegularExpression.test(email)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email format",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        status: "error",
        message: "Username already taken",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email already exist. Please login.",
      });
    }

    if (password.length < 8 || password.length >= 17) {
      return res.status(400).json({
        status: "error",
        message: "Password length should more than 8 and less than 17",
      });
    }
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        status: "success",
        message: "User created successfully!",
        data: {
          _id: newUser._id,
          fullname: newUser.fullname,
          username: newUser.username,
          email: newUser.email,
          followers: newUser.followers,
          followings: newUser.followings,
          profileImage: newUser.profileImage,
          coverImage: newUser.coverImage,
        },
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "User registration failed. Please try again.",
      });
    }
  } catch (error) {
    console.log(
      `authRegister Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordValid || !user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email address or password",
      });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully!",
      data: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        followers: user.followers,
        followings: user.followings,
        profileImage: user.profileImage,
        coverImage: user.coverImage,
      },
    });
  } catch (error) {
    console.log(
      `authLogin Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const authLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({
      status: "success",
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.log(
      `authLogout Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const authCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json({
      status: "success",
      message: "Fetched current user successfully.",
      data: user,
    });
  } catch (error) {
    console.log(
      `authCurrentUser Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
