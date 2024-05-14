import React from "react";
import { MdSearch } from "@/components/constants/Icons";
import { useQuery } from "@tanstack/react-query";
import AccountSmCardSkeleton from "@/components/loaders/AccountSmCardSkeleton";
import AccountSmCard from "@/components/cards/AccountSmCard";

const ExplorePage = () => {
  const { data: authorisedGetAllSuggestedUser, isLoading } = useQuery({
    queryKey: ["authorisedGetAllSuggestedUser"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/users/all-suggested-profile");
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

  const handleFormSubmit = () => {};

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-slate-300 dark:border-slate-500 min-h-screen p-4">
      <div className="w-full h-full flex flex-col items-start">
        <div className="w-full h-[62px] flex items-center justify-start border-b border-slate-300 dark:border-slate-500">
          <h1 className="text-2xl font-semibold capitalize leading-snug tracking-tight">
            Explore new people
          </h1>
        </div>

        <div className="w-full overflow-x-auto pt-3">
          <div className="flex w-full max-w-3xl flex-col items-start px-1 space-y-4">
            <div className="relative w-[60%]">
              <MdSearch className="absolute left-2 top-3 h-5 w-5 text-muted-foreground" />
              <input
                className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 pl-8 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
                inputMode="text"
                name="search"
                autoComplete="off"
                onChange={handleFormSubmit}
                placeholder="Search username ...."
              />
            </div>
            <div className="w-full h-fit flex flex-col items-start gap-2">
              {isLoading ? <AccountSmCardSkeleton count={6} /> :( authorisedGetAllSuggestedUser?.map((user) => (
                  <AccountSmCard
                    type="Follow"
                    key={user._id}
                    data={user}
                    handleFollowClick={""}
                  />
                )))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
