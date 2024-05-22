import WhoToFollow from "@/components/aside/WhoToFollow";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
} from "@/components/constants/Icons";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getRelativeTime } from "@/components/constants/DateFormat";
import PostDetailCommentForm from "@/components/forms/PostDetailCommentForm";
import { Separator } from "@/components/ui/separator";
import PostCommentCard from "@/components/cards/PostCommentCard";

const PostDetailPage = () => {
  let { postId } = useParams();
  const queryClient = useQueryClient();
  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  const { data: getSinglePostDetails, isLoading } = useQuery({
    queryKey: ["getSinglePostDetails"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/posts/single/${postId}`);
        const responseData = await response.json();
        console.log(responseData);
        if (responseData?.status == "error") {
          return null;
        }
        if (!response.ok) {
          throw new Error(responseData.message || "Something went wrong!");
        }
        if (responseData.status == "success") {
          return responseData?.data;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  const handlePostLikesCount = async () => {
    try {
      const response = await fetch(
        `/api/posts/like/${getSinglePostDetails?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  const [isLiked, setIsLiked] = useState(
    getSinglePostDetails?.likes.includes(authenticatedUser?._id)
  );

  return (
    <>
      <div className="md:flex-[4_4_0] mr-auto border-r border-slate-300 dark:border-slate-500  min-h-screen p-4 pt-0">
        <div className="w-full h-fit py-3 border-b border-slate-300 dark:border-slate-500">
          <Link
            to="/"
            className="text-xs font-semibold uppercase  hover:text-[#09090a] text-slate-400 dark:hover:text-white transition-all ease-in duration-200 flex items-center gap-2"
          >
            <FaArrowLeft /> Back
          </Link>
        </div>
        <div className="w-full h-fit rounded-md p-4 flex flex-row items-start justify-between transition-all ease-in duration-200 mb-2">
          <div className="w-12 h-fit">
            {getSinglePostDetails?.user?._id == authenticatedUser?._id ? (
              <img
                src={
                  getSinglePostDetails?.user?.profileImage ||
                  "/avatar-placeholder.png"
                }
                alt={getSinglePostDetails?.user?.fullname}
                className="w-11 h-11 rounded-full object-cover"
              />
            ) : (
              <Link to={`/profile/${getSinglePostDetails?.user?.username}`}>
                <img
                  src={
                    getSinglePostDetails?.user?.profileImage ||
                    "/avatar-placeholder.png"
                  }
                  alt={getSinglePostDetails?.user?.fullname}
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
                    {getSinglePostDetails?.user?.fullname}
                  </h1>
                  <span className="text-xs text-slate-500 font-semibold">
                    @{getSinglePostDetails?.user?.username}
                  </span>
                </div>
                <span className="text-xs text-slate-500 mt-1 ml-3 font-semibold">
                  {getSinglePostDetails?.createdAt && getRelativeTime(getSinglePostDetails?.createdAt)}
                </span>
              </div>
            </div>

            <div className="w-full h-fit flex flex-col items-start transition-all ease-in duration-200 text-start">
              {getSinglePostDetails?.text && (
                <div className="w-full h-fit py-2">
                  <p className="text-pretty text-md">
                    {getSinglePostDetails?.text}
                  </p>
                </div>
              )}
              {getSinglePostDetails?.image &&
              getSinglePostDetails?.sourceType === "image" ? (
                <div className="w-full h-fit pt-2">
                  <img
                    src={getSinglePostDetails?.image}
                    alt="post image"
                    className="w-full h-fit object-contain rounded-md"
                  />
                </div>
              ) : (
                <div className="w-full h-fit pt-2">
                  <video
                    autoPlay
                    controls
                    controlsList="nodownload nofullscreen"
                    className="w-full h-full rounded-lg object-contain"
                    src={getSinglePostDetails?.image}
                  >
                    Your browser does not support the video tag.
                  </video>
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
                  {getSinglePostDetails?.likes?.length}
                </span>
              </div>
              <div className="w-fit flex flex-row gap-1 items-center text-sm font-semibold text-slate-500 transition-all ease-in duration-200">
                <FaRegCommentDots />
                Comments ({getSinglePostDetails?.comments?.length})
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-fit border-t border-slate-300 dark:border-slate-500 flex flex-col items-start p-4 pt-5">
          <PostDetailCommentForm postId={postId} />
          <Separator className="my-3" />
          <div className="w-full h-fit flex flex-col justify-between items-start">
            <div className="w-full flex flex-row gap-1 items-center text-sm font-semibold text-slate-500 transition-all ease-in duration-200 mb-2">
              Comments ({getSinglePostDetails?.comments?.length})
            </div>
            <div className="w-full h-fit max-h-[490px] overflow-y-scroll flex flex-col items-start">
              {getSinglePostDetails?.comments.length > 0 ? (
                getSinglePostDetails?.comments?.map((comment) => (
                  <PostCommentCard commentData={comment} key={comment?._id} />
                ))
              ) : (
                <div className="w-full h-[200px] flex items-center justify-center rounded-md bg-slate-100 dark:bg-[#27272a] mt-2">
                  <p className="text-md font-semibold">
                    Be the first one to comment on this post.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <WhoToFollow createPostVisible={true} />
    </>
  );
};

export default PostDetailPage;
