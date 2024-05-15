import React, { useEffect, useState } from "react";
import { MdSearch } from "@/components/constants/Icons";
import { useQuery } from "@tanstack/react-query";
import AccountSmCardSkeleton from "@/components/loaders/AccountSmCardSkeleton";
import AccountSmCard from "@/components/cards/AccountSmCard";
import SearchedUserCard from "@/components/cards/SearchedUserCard";

const ExplorePage = () => {
  const [searchParam, setSearchParam] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);

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

  const handleFollowUser = async (followId) => {};

  const handleUserSearchChange = async () => {
    if (searchParam.length > 2) {
      const response = await fetch(`/api/users/search-profile/${searchParam}`);
      const responseData = await response.json();
      setSearchedUser(responseData?.data);
    }
  };

  useEffect(() => {
    if (searchParam.length === 0) {
      setSearchedUser([]);
    }
    handleUserSearchChange();
  }, [searchParam]);

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-slate-300 dark:border-slate-500 min-h-screen p-4">
      <div className="w-full h-full flex flex-col items-start">
        <div className="w-full h-[62px] flex items-center justify-start border-b border-slate-300 dark:border-slate-500">
          <h1 className="text-2xl font-semibold capitalize leading-snug tracking-tight">
            Explore new people
          </h1>
        </div>

        <div className="w-full overflow-x-auto pt-3">
          <div className="flex w-full max-w-2xl flex-col items-start px-1 space-y-4">
            <div className="relative w-[60%]">
              <MdSearch className="absolute left-2 top-3 h-5 w-5 text-muted-foreground" />
              <input
                className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 pl-8 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
                inputMode="text"
                name="search"
                autoComplete="off"
                onChange={(e) => setSearchParam(e.target.value)}
                value={searchParam}
                placeholder="Search username ...."
              />
            </div>
            {searchParam.length > 0 && (
              <p className="w-full flex flex-row items-center gap-2 text-sm text-slate-500 font-semibold">
                Searching
                <span className="font-bold text-md">@{searchParam}</span>
              </p>
            )}

            {searchParam.length !== 0 ? (
              searchedUser.length > 0 ? (
                searchedUser.map((user) => (
                  <SearchedUserCard key={user?._id} data={user} />
                ))
              ) : (
                <p>No user found!</p>
              )
            ) : null}
            <div className="w-full h-full max-h-[450px] pr-2 overflow-y-scroll flex flex-col items-start gap-2"></div>
            <p className="w-full flex flex-row items-center text-sm capitalize text-slate-500 font-semibold">
              all suggested users
            </p>
            <div className="w-full h-fit flex flex-col items-start gap-2">
              {isLoading ? (
                <AccountSmCardSkeleton count={6} />
              ) : (
                authorisedGetAllSuggestedUser?.map((user) => (
                  <SearchedUserCard key={user._id} data={user} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
