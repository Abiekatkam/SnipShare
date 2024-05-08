import WhoToFollow from "@/components/aside/WhoToFollow";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "@/components/constants/Icons";
import ProfilePageLinks from "./ProfilePageLinks";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProfileDetailPage = () => {
  let { username } = useParams();
  const [authorisedUserProfile, setAuthorisedUserProfile] = useState({});

  const FetchUserProfile = async (user) => {
    const response = await fetch(`/api/users/profile/${user}`);
    const responseData = await response.json();
    setAuthorisedUserProfile(responseData?.data);
  };

  useEffect(() => {
    FetchUserProfile(username);
  }, [username]);

  const dateFormat = new Date(authorisedUserProfile?.createdAt);
  const isLinkPresent =
    authorisedUserProfile?.websiteurl != "" ||
    authorisedUserProfile?.githuburl != "" ||
    authorisedUserProfile?.facebookurl != "" ||
    authorisedUserProfile?.instagramurl != "" ||
    authorisedUserProfile?.linkedinurl != "" ||
    authorisedUserProfile?.twitterurl != "";
  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r border-slate-300 dark:border-slate-500 min-h-screen p-4">
        <div className="w-full h-full flex flex-col items-start">
          <div className="w-full min-h-[400px] flex flex-col items-center justify-between border-b border-slate-300 dark:border-slate-500">
            <div className="w-full h-[200px] relative">
              <div className="w-full h-full bg-slate-200 dark:bg-slate-600 rounded-md">
                <img
                  src={authorisedUserProfile?.coverImage || "/cover.png"}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="absolute w-36 h-36 rounded-full bg-slate-400 z-10 -bottom-16 left-6 border-4 border-slate-200 dark:border-slate-300">
                <img
                  src={
                    authorisedUserProfile?.profileImage ||
                    "/avatar-placeholder.png"
                  }
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <Button className="w-fit ml-auto mt-3 mb-1 h-8 px-4 dark:text-white dark:bg-[#09090b] border rounded-md border-[#09090b] text-sm dark:border-slate-200">
                Follow
            </Button>

            <div className="w-full h-fit min-h-[125px] flex-col flex p-4 mt-2">
              <div className="w-full flex flex-row items-start justify-between">
                <div className="w-fit flex flex-col items-start">
                  <h1 className="text-2xl font-bold text-slate-900/80 dark:text-slate-50 capitalize">
                    {authorisedUserProfile?.fullname}
                  </h1>
                  <p className="text-md text-slate-700 dark:text-slate-400">
                    @{authorisedUserProfile?.username}
                  </p>
                </div>

                <span className="flex text-sm items-center gap-2 text-slate-700 dark:text-slate-400">
                  <FaRegCalendarAlt /> Joined{" "}
                  {dateFormat.toLocaleString("default", { month: "long" })}{" "}
                  {dateFormat.getFullYear()}
                </span>
              </div>

              {isLinkPresent && (
                <ProfilePageLinks authenticatedUser={authorisedUserProfile} />
              )}

              {authorisedUserProfile?.bio && (
                <div className="w-full h-fit mt-2 indent-7 text-pretty">
                  {authorisedUserProfile?.bio}
                </div>
              )}

              <div className="w-fit h-fit mt-2 flex flex-row items-start gap-4">
                <div className="w-fit flex items-center">
                  <p className="text-sm flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-[#09090b] dark:text-white">
                      {authorisedUserProfile?.followers?.length}
                    </span>{" "}
                    Followers
                  </p>
                </div>
                <div className="w-fit flex items-center">
                  <p className="text-sm flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-[#09090b] dark:text-white">
                      {authorisedUserProfile?.followings?.length}
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
      <WhoToFollow />
    </>
  );
};

export default ProfileDetailPage;
