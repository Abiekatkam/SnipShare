import React, { useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentDots
} from "@/components/constants/Icons";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../constants/DateFormat";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PostEditModal from "../modals/PostEditModal";

const PostCard = ({ posts }) => {
  const queryClient = useQueryClient();
  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  const [isLiked, setIsLiked] = useState(
    posts?.likes.includes(authenticatedUser?._id)
  );

  const handlePostLikesCount = async () => {
    try {
      const response = await fetch(`/api/posts/like/${posts?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status == "success") {
        if (data.type) {
          setIsLiked(false);
        } else {
          setIsLiked(true);
        }
        queryClient.invalidateQueries({
          queryKey: ["getAllPostFeed"],
        });
        queryClient.invalidateQueries({
          queryKey: ["authorisedCurrentUser"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getUserPostFeed"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getUserLikedPost"],
        });
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="w-full h-fit rounded-md p-4 flex flex-row items-start justify-between bg-slate-50 dark:bg-[#09090b] hover:bg-slate-100 transition-all dark:hover:bg-[#27272a] ease-in duration-200 mb-3">
      <div className="w-12 h-fit">
        {posts?.user?._id == authenticatedUser?._id ? (
          <img
            src={posts?.user?.profileImage || "/avatar-placeholder.png"}
            alt={posts?.user?.fullname}
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : (
          <Link to={`/profile/${posts?.user?.username}`}>
            <img
              src={posts?.user?.profileImage || "/avatar-placeholder.png"}
              alt={posts?.user?.fullname}
              className="w-11 h-11 rounded-full object-cover"
            />
          </Link>
        )}
      </div>
      <div className="w-[90%] h-full flex flex-col items-start">
        <div className="w-full h-fit flex flex-row justify-between items-start">
          <div className="w-fit h-fit flex flex-row justify-start items-start">
            <div className="w-fit h-fit flex flex-col gap-0">
              <h1 className="text-md font-bold text-[#09090a] dark:text-white capitalize">
                {posts?.user?.fullname}
              </h1>
              <span className="text-xs text-slate-500 font-semibold">
                @{posts?.user?.username}
              </span>
            </div>
            <span className="text-xs text-slate-500 mt-1 ml-3 font-semibold">
              {getRelativeTime(posts?.createdAt)}
            </span>
          </div>

          {authenticatedUser?._id == posts?.user?._id && (
            <PostEditModal data={posts}/>
          )}
        </div>
        <div className="w-full h-fit flex flex-col items-start cursor-pointer">
          {posts?.text && (
            <div className="w-full h-fit py-2">
              <p className="text-pretty text-md">{posts?.text}</p>
            </div>
          )}
          {posts?.image && (
            <div className="w-full h-fit">
              <img
                src={posts?.image}
                alt="post image"
                className="w-full h-fit object-cover rounded-md"
              />
            </div>
          )}
        </div>
        <div className="w-full h-fit flex flex-row justify-end items-center gap-4 mt-4 border-t-2 border-slate-600/20 pt-1">
          <div
            className="w-fit flex flex-row gap-1 items-center text-sm font-semibold text-slate-500 group cursor-pointer transition-all ease-in duration-200"
            onClick={handlePostLikesCount}
          >
            <span
              className={
                isLiked
                  ? "text-[#09090a] dark:text-white"
                  : "group-hover:text-slate-900"
              }
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
            </span>{" "}
            <span
              className={
                isLiked
                  ? "text-[#09090a] dark:text-white"
                  : "group-hover:text-slate-900"
              }
            >
              {posts?.likes?.length}
            </span>
          </div>
          <div className="w-fit flex flex-row gap-1 items-center text-sm font-semibold text-slate-500 group cursor-pointer transition-all ease-in duration-200">
            <span className="group-hover:text-sky-500">
              <FaRegCommentDots />
            </span>{" "}
            <span className="group-hover:text-sky-500">Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
