import React from "react";
import { Link } from "react-router-dom";
import { FaTrashCan } from "@/components/constants/Icons";
import { getRelativeTime } from "../constants/DateFormat";

const NotificationCard = ({ notify, handleSingleNotification }) => {
  let message =
    notify?.type == "follow"
      ? "started following you"
      : notify?.type == "commnet"
      ? "commented on your post"
      : "liked your post";
  return (
    <div className="w-full flex items-center justify-between gap-3 rounded-xl p-2 px-3 font-semibold text-lg tracking-wide dark:text-white transition-all text-[#09090b] ease-in mb-2 group">
      <div className="w-full flex items-center gap-3">
        <Link
          to={`/profile/${notify?.from?.username}`}
          className="w-fit flex items-center gap-2"
        >
          <img
            src={notify?.from?.profileImage || "/avatar-placeholder.png"}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <h1 className="text-sm capitalize">@{notify?.from?.username}</h1>
          {/* <span className="text-xs text-slate-500 mb-1">
              @{notify?.from?.username}
            </span> */}
        </Link>
        <span className="text-sm font-normal">{message}</span>
        <span className="text-xs text-slate-600 dark:text-slate-300"> {getRelativeTime(notify?.createdAt)}</span>
      </div>
      <span
        className="text-sm text-slate-600 dark:text-slate-300 hidden group-hover:block cursor-pointer"
        onClick={() => handleSingleNotification(notify?._id)}
      >
        <FaTrashCan />
      </span>
    </div>
  );
};

export default NotificationCard;
