import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfileFollowUnfollow = ({ followId, isFollowing = "", setIsFollowing}) => {
  const [isFollow, setIdFollow] = useState(isFollowing);
  const queryClient = useQueryClient();

  const UpdateFollowUnfollowUser = async () => {
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
        setIdFollow(data?.type);
        setIsFollowing(data?.type);
        queryClient.invalidateQueries({
          queryKey: ["authorisedGetSuggestedUser"],
        });
        if (data.show) {
          toast.success(data?.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Button
      onClick={() => UpdateFollowUnfollowUser()}
      className={`w-fit ml-auto mt-3 mb-1 h-8 px-4 text-sm border rounded-md border-[#09090b] dark:border-slate-200 ${
        isFollow == "Follow"
          ? "dark:text-white dark:bg-[#09090b]"
          : "text-[#09090b] bg-white dark:text-white dark:bg-[#09090b] hover:bg-white dark:hover:bg-[#09090b]"
      } `}
    >
      {isFollow}
    </Button>
  );
};

export default ProfileFollowUnfollow;
