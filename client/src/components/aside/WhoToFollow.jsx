import React from "react";
import CreatePostModal from "../modals/CreatePostModal";
import AccountSmCard from "../cards/AccountSmCard";
import { CopyrightYear } from "../constants/Urls";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AccountSmCardSkeleton from "../loaders/AccountSmCardSkeleton";
import { toast } from "react-toastify";

const WhoToFollow = ({ createPostVisible = false }) => {
  const queryClient = useQueryClient();

  const { data: authorisedGetSuggestedUser, isLoading } = useQuery({
    queryKey: ["authorisedGetSuggestedUser"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/users/suggested-profile");
        const responseData = await response.json();
        if (responseData?.status == "error") {
          return null;
        }
        if (!response.ok) {
          throw new Error(responseData.message || "Something went wrong!");
        }
        return responseData.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  const handleUnfollowFollowingList = async (userIdToUnfollow) => {
    try {
      const response = await fetch("/api/users/follow", {
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
    } catch (error) {
      toast.error("Error unfollowing user:", error.message);
    }
  };

  return (
    <div className="flex-[3_3_0] w-20 max-w-96 min-h-screen">
      <div className="sticky top-0 left-0 h-screen flex flex-col w-20 md:w-full p-4">
        {/* suggested users */}

        {authorisedGetSuggestedUser?.length > 0 ? (
          <div className="w-full h-fit border border-slate-300 dark:border-slate-500 rounded-xl p-3 flex flex-col items-start gap-3">
            <h1 className="text-xl font-bold text-[#09090b] dark:text-slate-50">
              Who to follow
            </h1>
            <div className="w-full max-h-[328px] h-fit overflow-y-scroll flex flex-col justify-start">
              {isLoading ? (
                <AccountSmCardSkeleton count={4} />
              ) : (
                authorisedGetSuggestedUser?.map((user) => (
                  <AccountSmCard
                    type="Follow"
                    key={user._id}
                    data={user}
                    handleFollowClick={handleUnfollowFollowingList}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-fit border border-slate-300 dark:border-slate-500 rounded-xl p-3 flex flex-col items-start gap-3 text-pretty text-center">
            Share your story, inspire the world. Snipshare: where every moment
            becomes a masterpiece.
          </div>
        )}

        {createPostVisible && (
          <div className="mt-5 w-full">
            <CreatePostModal />
          </div>
        )}

        <div className="mt-auto">
          <p className="text-xs dark:text-slate-300 text-[#09090b]">
            At {CopyrightYear}, This project is developed by Abhishek Katkam.
            All rights reserved by SnipShare.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoToFollow;
