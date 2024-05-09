import WhoToFollow from "@/components/aside/WhoToFollow";
import React from "react";
import { FaRegCalendarAlt } from "@/components/constants/Icons";
import { useQuery } from "@tanstack/react-query";
import ProfilePageLinks from "./ProfilePageLinks";
import EditProfileModal from "@/components/modals/EditProfileModal";
import FollowersListModal from "@/components/modals/FollowersListModal";
import FollowingListModal from "@/components/modals/FollowingListModal";

const ProfilePage = () => {
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
    authenticatedUser?.twitterurl != "";

  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r border-slate-300 dark:border-slate-500 min-h-screen p-4">
        <div className="w-full h-full flex flex-col items-start">
          <div className="w-full min-h-[400px] flex flex-col items-center justify-between border-b border-slate-300 dark:border-slate-500">
            <div className="w-full h-[200px] relative">
              <div className="w-full h-full bg-slate-200 dark:bg-slate-600 rounded-md">
                <img
                  src={authenticatedUser?.coverImage || "/cover.png"}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="absolute w-36 h-36 rounded-full bg-slate-400 z-10 -bottom-16 left-6 border-4 border-slate-200 dark:border-slate-300">
                <img
                  src={
                    authenticatedUser?.profileImage || "/avatar-placeholder.png"
                  }
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <EditProfileModal />

            <div className="w-full h-fit min-h-[125px] flex-col flex p-4 mt-2">
              <div className="w-full flex flex-row items-start justify-between">
                <div className="w-fit flex flex-col items-start">
                  <h1 className="text-2xl font-bold text-slate-900/80 dark:text-slate-50 capitalize">
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

              {isLinkPresent && (
                <ProfilePageLinks authenticatedUser={authenticatedUser} />
              )}

              {authenticatedUser?.bio && (
                <div className="w-full h-fit mt-2 indent-7 text-pretty">
                  {authenticatedUser?.bio}
                </div>
              )}

              <div className="w-fit h-fit mt-2 flex flex-row items-start gap-4">
                <FollowersListModal
                  FollowersCount={authenticatedUser?.followers?.length}
                  UserId={authenticatedUser?._id}
                  isAccountPrivate={false}
                />
                <FollowingListModal
                  FollowingCount={authenticatedUser?.followings?.length}
                  UserId={authenticatedUser?._id}
                  isAccountPrivate={false}
                />
              </div>
            </div>
          </div>

          {/* personal feed */}
          <div></div>
        </div>
      </div>
      <WhoToFollow createPostVisible={true} />
    </>
  );
};

export default ProfilePage;
