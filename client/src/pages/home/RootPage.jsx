import WhoToFollow from "@/components/aside/WhoToFollow";
import PostCard from "@/components/cards/PostCard";
import PostCardLoader from "@/components/loaders/PostCardLoader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const RootPage = () => {
  const [feedType, setFeedType] = useState("ForYou");
  const queryClient = useQueryClient();

  const { data: getAllPostFeed, isLoading: isAllPostFeedLoading } = useQuery({
    queryKey: ["getAllPostFeed"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/posts/all");
        const responseData = await response.json();
        if (responseData?.status == "error") {
          return null;
        }
        if (!response.ok) {
          throw new Error(responseData.message || "Something went wrong!");
        }
        queryClient.invalidateQueries({
          queryKey: ["getAllFollowingPostFeed"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getAllPostFeed"],
        });
        return responseData;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  const {
    data: getAllFollowingPostFeed,
    isLoading: isAllFollowingPostFeedLoading,
  } = useQuery({
    queryKey: ["getAllFollowingPostFeed"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/posts/following");
        const responseData = await response.json();
        if (responseData?.status == "error") {
          return null;
        }
        if (!response.ok) {
          throw new Error(responseData.message || "Something went wrong!");
        }
        queryClient.invalidateQueries({
          queryKey: ["getAllFollowingPostFeed"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getAllPostFeed"],
        });
        return responseData?.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  return (
    <>
      <div className="md:flex-[4_4_0] mr-auto border-r border-slate-300 dark:border-slate-500  min-h-screen p-4 pt-0">
        <div className="w-full h-[80px] sticky z-50 top-0 right-0 flex dark:bg-[#09090b] bg-white border-b border-b-slate-400">
          <div
            className="w-1/2 h-full flex items-end justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-[#27272a]"
            onClick={() => setFeedType("ForYou")}
          >
            <span
              className={`text-lg h-full pt-10 font-bold w-[40%] text-center border-b-2 ${
                feedType == "ForYou"
                  ? " border-b-[#09090b] dark:border-b-slate-100"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              For you
            </span>
          </div>
          <div
            className="w-1/2 h-full flex items-end justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-[#27272a]"
            onClick={() => setFeedType("Following")}
          >
            <span
              className={`text-lg h-full pt-10 font-bold w-[40%] text-center border-b-2 ${
                feedType == "Following"
                  ? " border-b-[#09090b] dark:border-b-slate-100"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Following
            </span>
          </div>
        </div>

        {feedType == "ForYou" && (
          <div className="mt-4 h-fit pr-1">
            {isAllPostFeedLoading ? (
              <PostCardLoader count={4} />
            ) : (
              getAllPostFeed &&
              getAllPostFeed.map((post) => (
                <PostCard key={post._id} posts={post} />
              ))
            )}
          </div>
        )}

        {feedType == "Following" && (
          <div className="mt-4 h-fit pr-1">
            {isAllFollowingPostFeedLoading ? (
              <PostCardLoader count={4} />
            ) : (
              getAllFollowingPostFeed &&
              getAllFollowingPostFeed.map((post) => (
                <PostCard key={post._id} posts={post} />
              ))
            )}
          </div>
        )}
      </div>
      <WhoToFollow createPostVisible={true} />
    </>
  );
};

export default RootPage;
