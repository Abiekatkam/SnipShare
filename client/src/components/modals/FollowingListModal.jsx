import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SuggestedUserCard from "../cards/SuggestedUserCard";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const FollowingListModal = ({ FollowingCount, UserId, isAccountPrivate }) => {
  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  const [fetchFollowingList, setFetchFollowingList] = useState([]);

  const GetUserFollowingsList = async (userId) => {
    try {
      const response = await fetch("/api/users/following-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });

      const data = await response.json();
      if (data.status == "success") {
        setFetchFollowingList(data?.data);
      }
    } catch (error) {
      toast.error("Error fetching user following list:", error.message);
    }
  };

  return !isAccountPrivate ? (
    <Dialog>
      <DialogTrigger
        asChild
        className="cursor-pointer hover:underline transition-all ease-in duration-200"
        onClick={() => GetUserFollowingsList(UserId)}
      >
        <div className="w-fit flex items-center">
          <p className="text-sm flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-[#09090b] dark:text-white">
              {FollowingCount}
            </span>{" "}
            Followings
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#09090b] p-4 gap-3">
        <DialogHeader className="p-0">
          <DialogTitle>
            {authenticatedUser._id == UserId && "Your"} Followings
          </DialogTitle>
        </DialogHeader>

        <div className="w-full max-h-[500px] h-fit min-h-[350px] overflow-y-scroll flex flex-col items-start justify-start gap-1">
          {fetchFollowingList.length > 0 ? (
            fetchFollowingList?.map((users) => (
              <SuggestedUserCard key={users._id} data={users} />
            ))
          ) : (
            <p className="w-fit m-auto text-pretty text-center px-6 text-md">
              Every connection is an opportunity waiting to happen! While you
              may not have any followers yet, remember that every great journey
              starts with a single step. Take this as an opportunity to reach
              out, connect, and engage with others in your community. Embrace
              the power of networking, and watch as your circle grows with each
              meaningful interaction. Your voice matters, and every connection
              you make brings you one step closer to realizing your dreams. So,
              don't be afraid to put yourself out there, make new friends, and
              share your unique perspective with the world. Together, we can
              create something truly remarkable!
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <div className="w-fit flex items-center">
      <p className="text-sm flex items-center gap-1 text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-[#09090b] dark:text-white">
          {FollowingCount}
        </span>{" "}
        Followings
      </p>
    </div>
  );
};

export default FollowingListModal;
