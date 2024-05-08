import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const SuggestedUserCard = ({ data }) => {
  return (
    <div className="w-full flex items-center justify-between gap-3 rounded-xl p-2 px-3 font-semibold text-lg tracking-wide dark:text-white transition-all bg-slate-200 text-[#09090b] ease-in dark:bg-[#27272a]/50 mb-2">
      <Link
        to={`/profile/${data?.username}`}
        className="w-fit flex items-start gap-2"
      >
        <img
          src={data.profileImage || "/avatar-placeholder.png"}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="w-fit h-full flex flex-col items-start">
          <h1 className="text-sm">{data?.fullname}</h1>
          <span className="text-xs text-slate-500 mb-2">@{data?.username}</span>
          {data?.bio && <p className="text-xs text-pretty">{data?.bio}</p>}
        </div>
      </Link>
      <Button className="h-7 text-sm bg-[#09090b] dark:bg-white capitalize">
        unfollow
      </Button>
    </div>
  );
};

export default SuggestedUserCard;
