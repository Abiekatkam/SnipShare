import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const SearchedUserCard = ({ data }) => {
  const queryClient = useQueryClient();

  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  const [isFollowing, setIsFollowing] = useState(
    authenticatedUser?.followings.includes(data?._id) ? "Unfollow" : "Follow"
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
        queryClient.invalidateQueries({
          queryKey: ["authorisedCurrentUser"],
        });
        setIsFollowing(data?.type);
        if (data.show) {
          toast.success(data?.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mt-auto w-full flex items-start justify-between gap-3 rounded-xl p-2 px-3 font-semibold text-lg tracking-wide dark:text-white transition-all bg-slate-50 text-[#09090b] ease-in dark:bg-[#27272a]/50 mb-2">
      <div className="w-fit h-fit flex flex-col items-start">
        <Link
          to={`/profile/${data?.username}`}
          className="w-fit flex items-center gap-2"
        >
          <img
            src={data?.profileImage || "/avatar-placeholder.png"}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="w-fit h-full flex flex-col items-start">
            <h1 className="text-sm">{data?.fullname}</h1>
            <p className="text-xs text-slate-500">@{data?.username}</p>
          </div>
        </Link>

        {data?.bio && (
          <span className="text-xs text-pretty ml-12 text-slate-400">
            {data?.bio}
          </span>
        )}
      </div>
      {authenticatedUser?._id != data?._id && (
        <Button
          className="h-7 bg-[#09090b] dark:bg-white"
          onClick={() => UpdateFollowUnfollowUser(data?._id)}
        >
          {isFollowing}
        </Button>
      )}
    </div>
  );
};

export default SearchedUserCard;
