import User from "../models/user.models.js";
import Post from "../models/post.models.js";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.models.js";

export const createPost = async (req, res) => {
  try {
    const { description: text, sourceType } = req.body;
    let { image } = req.body;
    const userId = req.user._id.toString();
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found",
      });
    }

    if (!text && !image) {
      return res.status(400).json({
        status: "error",
        message: "Post must have text or image",
      });
    }

    if (image) {
      const uploadedImageResponse = await cloudinary.uploader.upload(image);
      image = uploadedImageResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      image,
      sourceType,
    });

    await newPost.save();
    res.status(201).json({
      status: "success",
      message: "Post uploaded successfully",
      data: newPost,
    });
  } catch (error) {
    console.log(
      `createPost Post Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const editPost = async (req, res) => {
  try {
    const { description: text, sourceType, postId } = req.body;
    let { image } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found",
      });
    }
    if (!post) {
      return res.status(400).json({
        status: "error",
        message: "Post not found",
      });
    }

    if (userId.toString() !== post?.user.toString()) {
      return res.status(400).json({
        status: "error",
        message: "This action is restricted.",
      });
    }

    if (!text && !image) {
      return res.status(400).json({
        status: "error",
        message: "Post must have text or image",
      });
    }

    if (image) {
      const uploadedImageResponse = await cloudinary.uploader.upload(image);
      image = uploadedImageResponse?.secure_url;
    } else {
      await cloudinary.uploader.destroy(
        post.image.split("/").pop().split(".")[0]
      );
    }

    post.image = image;
    post.text = text;
    post.sourceType = sourceType;
    post.user = userId;

    await post.save();

    res.status(201).json({
      status: "success",
      message: "Post updated successfully",
    });
  } catch (error) {
    console.log(`editPost Post Controller : ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "No post found.",
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(400).json({
        status: "error",
        message: "You cannot perform this action.",
      });
    }

    if (post.image) {
      const imageId = post.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imageId);
    }

    await Post.findByIdAndDelete(req.params.postId);
    return res.status(200).json({
      status: "success",
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.log(
      `deletePost Post Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({
        status: "error",
        message: "Text value is required.",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        status: "error",
        message: "Post not found",
      });
    }

    const comment = { user: userId, text };
    post.comments.push(comment);

    const newNotification = new Notification({
      type: "comment",
      from: req.user._id,
      to: post.user,
    });

    await newNotification.save();

    await post.save();

    return res.status(200).json({
      status: "success",
      message: "Comment sent successfully.",
    });
  } catch (error) {
    console.log(
      `commentOnPost Post Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        status: "error",
        message: "Post not found",
      });
    }

    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
      return res.status(200).json({
        status: "success",
        type: true,
        message: "Post unliked successfully.",
      });
    } else {
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const newNotification = new Notification({
        type: "like",
        from: userId,
        to: post.user,
      });

      await newNotification.save();
      return res.status(200).json({
        status: "success",
        type: false,
        message: "Post liked successfully.",
      });
    }
  } catch (error) {
    console.log(
      `likeUnlikePost Post Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    if (posts.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.log(
      `getAllPosts Post Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getLikedPost = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "No user found",
      });
    }

    const likedPosts = await Post.find({
      _id: { $in: user.likedPosts },
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json({
      status: "success",
      message: "All liked post",
      data: likedPosts,
    });
  } catch (error) {
    console.log(
      `getLikedPost Post Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getAllFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "No user found",
      });
    }

    const following = user.followings;
    const feedPosts = await Post.find({ user: { $in: following } })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json({
      status: "success",
      message: "All following feed post",
      data: feedPosts,
    });
  } catch (error) {
    console.log(
      `getAllFollowingPosts Post Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getUsersPost = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "No user found",
      });
    }

    const post = await Post.find({ user: user._id })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json({
      status: "success",
      message: "getting specific user posts",
      data: post,
    });
  } catch (error) {
    console.log(
      `getUsersPost Post Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
