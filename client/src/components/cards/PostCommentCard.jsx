import React from "react";
import { Link } from "react-router-dom";
import { FaTrashCan } from "@/components/constants/Icons";

const PostCommentCard = ({ commentData, isValidUserPost, handleSinglePostComment }) => {


  return (
    <div className="w-full h-fit flex items-start gap-2 p-2 bg-slate-50 dark:bg-[#27272a] rounded-md mb-2 group">
      <Link
        to={`/profile/${commentData?.user?.username}`}
        className="w-fit h-full flex items-start flex-col"
      >
        <img
          src={commentData?.user?.profileImage || "/avatar-placeholder.png"}
          alt="profile image"
          className="w-9 h-9 rounded-full object-cover"
        />
      </Link>
      <div className="w-[92%] h-fit flex flex-col">
        <div className="w-full flex h-fit items-start justify-between">
          <div className="w-fit h-fit flex flex-col items-start gap-0 justify-between font-semibold">
            <h1 className="text-sm">{commentData?.user?.fullname}</h1>
            <p className="text-xs text-slate-500 -mt-1">
              @{commentData?.user?.username}
            </p>
          </div>
          {isValidUserPost && <span
            className="text-xs text-slate-600 dark:text-slate-300 hidden group-hover:block cursor-pointer"
            onClick={() => handleSinglePostComment(commentData?._id)}
          >
            <FaTrashCan />
          </span>}
        </div>
        <p className="text-sm text-pretty mt-1">{commentData?.text}</p>
      </div>
    </div>
  );
};

export default PostCommentCard;
