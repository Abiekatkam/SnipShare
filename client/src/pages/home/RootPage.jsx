import WhoToFollow from "@/components/aside/WhoToFollow";
import PostCard from "@/components/cards/PostCard";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const RootPage = () => {
  const [feedType, setFeedType] = useState("ForYou");

  const { data: getAllPostFeed } = useQuery({
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
        return responseData;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  console.log(getAllPostFeed);
  return (
    <>
      <div className="md:flex-[4_4_0] mr-auto border-r border-slate-300 dark:border-slate-500  min-h-screen p-4 pt-0">
        <div className="w-full h-[80px] sticky top-0 right-0 flex dark:bg-[#09090b] bg-white border-b border-b-slate-400">
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

        <div className="mt-4 overflow-y-scroll h-fit pr-1">
          {getAllPostFeed && getAllPostFeed.map((post)=>(
            <PostCard key={post._id} posts={post}/>
          ))}
        </div>
      </div>
      <WhoToFollow createPostVisible={true} />
    </>
  );
};

export default RootPage;
