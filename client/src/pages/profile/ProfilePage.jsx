import WhoToFollow from "@/components/aside/WhoToFollow";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaRegCalendarAlt } from "@/components/constants/Icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProfilePageLinks from "./ProfilePageLinks";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });
  const dateFormat = new Date(authenticatedUser?.createdAt);
  const isLinkPresent =
    authenticatedUser?.websiteurl != "" ||
    authenticatedUser?.githuburl != "" ||
    authenticatedUser?.facebookurl != "" ||
    authenticatedUser?.instagramurl != "" ||
    authenticatedUser?.linkedinurl != "" ||
    authenticatedUser?.twitterurl != "" ||
    true;

  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r border-slate-300 dark:border-slate-500 min-h-screen p-4">
        <div className="w-full h-full flex flex-col items-start">
          <div className="w-full min-h-[400px] flex flex-col items-center justify-between border-b border-slate-300 dark:border-slate-500">
            <div className="w-full h-[200px] relative">
              <div className="w-full h-full bg-slate-200 dark:bg-slate-600">
                <img
                  src="https://images.unsplash.com/photo-1528465424850-54d22f092f9d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute w-36 h-36 rounded-full bg-slate-400 z-10 -bottom-16 left-6 border-4 border-slate-200 dark:border-slate-300">
                <img
                  src="/avatar-placeholder.png"
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <Button
              variant="outline"
              className="w-fit ml-auto my-3 mb-1 h-8 dark:bg-[#09090b]"
            >
              Edit Profile
            </Button>

            <div className="w-full h-fit min-h-[145px] flex-col flex p-4 mt-2">
              <div className="w-full flex flex-row items-start justify-between">
                <div className="w-fit flex flex-col items-start">
                  <h1 className="text-2xl font-bold text-slate-900/80 dark:text-slate-50">
                    {authenticatedUser?.fullname}
                  </h1>
                  <p className="text-md text-slate-700 dark:text-slate-400">
                    @{authenticatedUser?.username}
                  </p>
                </div>

                <span className="flex text-sm items-center gap-2 text-slate-700 dark:text-slate-400">
                  <FaRegCalendarAlt /> Joined{" "}
                  {dateFormat.toLocaleString("default", { month: "long" })}{" "}
                  {dateFormat.getFullYear()}
                </span>
              </div>

              {isLinkPresent && <ProfilePageLinks />}

              {authenticatedUser?.bio && (
                <div className="w-full h-fit mt-2 indent-7 text-balance">
                  {authenticatedUser?.bio}
                </div>
              )}

              <div className="w-fit h-fit mt-2 flex flex-row items-start gap-4">
                <div className="w-fit flex items-center">
                  <p className="text-sm flex items-center gap-1 dark:text-slate-400">
                    <span className="font-semibold dark:text-white">
                      {authenticatedUser?.followers?.length}
                    </span>{" "}
                    Followers
                  </p>
                </div>
                <div className="w-fit flex items-center">
                  <p className="text-sm flex items-center gap-1 dark:text-slate-400">
                    <span className="font-semibold dark:text-white">
                      {authenticatedUser?.followings?.length}
                    </span>{" "}
                    Followings
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* personal feed */}
          <div></div>
        </div>
      </div>
      <WhoToFollow isHomePage={true} />
    </>
  );
};

export default ProfilePage;
