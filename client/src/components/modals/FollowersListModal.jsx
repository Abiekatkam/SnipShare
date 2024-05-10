import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import SuggestedUserCard from "../cards/SuggestedUserCard";

const FollowersListModal = ({ FollowersCount, UserId, isAccountPrivate }) => {
  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  const [fetchFollowersList, setFetchFollowersList] = useState([]);
  const queryClient = useQueryClient();

  const GetUserFollowersList = async (userId) => {
    try {
      const response = await fetch("/api/users/followers-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status == "success") {
        setFetchFollowersList(data?.data);
      }
    } catch (error) {
      toast.error("Error fetching user followers list:", error.message);
    }
  };

  const handleUnfollowFollowerList = async (userIdToUnfollow) => {
    try {
      const response = await fetch("/api/users/remove-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followerId: userIdToUnfollow }),
      });

      const data = await response.json();
      if (data.status == "success") {
        queryClient.invalidateQueries({
          queryKey: ["authorisedGetSuggestedUser"],
        });
        queryClient.invalidateQueries({
          queryKey: ["authorisedCurrentUser"],
        });
      }
  
      const updatedFollowerList = fetchFollowersList.filter(user => user._id !== userIdToUnfollow);
      setFetchFollowersList(updatedFollowerList);
    } catch (error) {
      toast.error("Error unfollowing user:", error.message);
    }
  };

  return !isAccountPrivate ? (
    <Dialog>
      <DialogTrigger
        asChild
        className="cursor-pointer hover:underline transition-all ease-in duration-200"
        onClick={() => GetUserFollowersList(UserId)}
      >
        <div className="w-fit flex items-center">
          <p className="text-sm flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-[#09090b] dark:text-white">
              {FollowersCount}
            </span>{" "}
            Followers
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#09090b] p-4 gap-3">
        <DialogHeader className="p-0">
          <DialogTitle>
            {authenticatedUser._id == UserId && "Your"} Followers
          </DialogTitle>
        </DialogHeader>

        <div className="w-full max-h-[500px] h-fit min-h-[350px] overflow-y-scroll flex flex-col items-start justify-start gap-1">
          {fetchFollowersList.length > 0 ? (
            fetchFollowersList?.map((users) => (
              <SuggestedUserCard key={users._id} data={users} handleUnfollow={handleUnfollowFollowerList} type="Remove" />
            ))
          ) : (
            <p className="w-fit m-auto text-pretty text-center px-6 text-md">
              Don't let the number zero discourage you! Every journey begins
              with a single step, and every follower starts with a connection.
              Embrace this moment as an opportunity to expand your network,
              share your passions, and connect with like-minded individuals from
              all walks of life.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <div className="w-fit flex items-center">
      <p className="text-sm flex items-center gap-1 text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-[#09090b] dark:text-white">
          {FollowersCount}
        </span>{" "}
        Followers
      </p>
    </div>
  );
};

export default FollowersListModal;
