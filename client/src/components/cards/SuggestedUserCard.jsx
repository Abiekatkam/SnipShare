import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const SuggestedUserCard = ({
  data,
  handleUnfollow,
  requestType,
  listType,
  reference,
}) => {
  const handleCloseModalReference = () => {
    reference.current.click();
  };

  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  const [isFollowing, setIsFollowing] = useState(
    authenticatedUser?.followings.includes(data?._id)
  );
  const [isFollower, setIsFollower] = useState(
    authenticatedUser?.followers.includes(data?._id)
  );

  const UpdateFollowUnfollowUser = async (followId) => {
    try {
      const response = await fetch("/api/users/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followerId: followId }),
      });

      const data = await response.json();
      if (data.status == "success") {
        setIsFollowing(data?.type);
        setIsFollower(data?.type);
        if (data.show) {
          toast.success(data?.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-3 rounded-xl p-2 px-3 font-semibold text-lg tracking-wide dark:text-white transition-all bg-slate-200 text-[#09090b] ease-in dark:bg-[#27272a]/50 mb-2">
      <Link
        to={`/profile/${data?.username}`}
        className="w-fit flex items-start gap-2"
        onClick={handleCloseModalReference}
      >
        <img
          src={data.profileImage || "/avatar-placeholder.png"}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="w-fit h-full flex flex-col items-start">
          <h1 className="text-sm">{data?.fullname}</h1>
          <span className="text-xs text-slate-500 mb-1">@{data?.username}</span>
          {data?.bio && (
            <span className="text-xs text-pretty text-slate-400">
              {data?.bio}
            </span>
          )}
        </div>
      </Link>
      {authenticatedUser?._id != data?._id ? (
        requestType ? (
          <Button
            className="h-7 text-sm bg-[#09090b] dark:bg-white capitalize"
            onClick={() => handleUnfollow(data?._id)}
          >
            {requestType}
          </Button>
        ) : listType == "following" ? (
          <Button
            className="h-7 text-sm bg-[#09090b] dark:bg-white capitalize"
            onClick={() => UpdateFollowUnfollowUser(data?._id)}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        ) : (
          <Button
            className="h-7 text-sm bg-[#09090b] dark:bg-white capitalize"
            onClick={() => UpdateFollowUnfollowUser(data?._id)}
          >
            {isFollower ? "Unfollow" : "Follow"}
          </Button>
        )
      ) : null}
    </div>
  );
};

export default SuggestedUserCard;
