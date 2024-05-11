import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const AccountSmCard = ({ type, data, handleFollowClick }) => {
  return (
    <div className="mt-auto w-full flex items-center justify-between gap-3 rounded-xl p-2 px-3 font-semibold text-lg tracking-wide dark:text-white transition-all bg-slate-50 text-[#09090b] ease-in dark:bg-[#27272a]/50 mb-2">
      <Link
        to={`/profile/${data?.username}`}
        className="w-fit flex items-center gap-2"
      >
        <img
          src={data.profileImage || "/avatar-placeholder.png"}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="w-fit h-full flex flex-col items-start">
          <h1 className="text-sm">{data?.fullname}</h1>
          <p className="text-xs text-slate-500">@{data?.username}</p>
        </div>
      </Link>
      <Button
        className="h-7 bg-[#09090b] dark:bg-white"
        onClick={() => handleFollowClick(data?._id)}
      >
        {type}
      </Button>
    </div>
  );
};

export default AccountSmCard;
