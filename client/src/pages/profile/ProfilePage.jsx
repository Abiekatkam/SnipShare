import WhoToFollow from "@/components/aside/WhoToFollow";
import React, { useState } from "react";
import { FaRegCalendarAlt } from "@/components/constants/Icons";
import { useQuery } from "@tanstack/react-query";
import ProfilePageLinks from "./ProfilePageLinks";
import EditProfileModal from "@/components/modals/EditProfileModal";
import FollowersListModal from "@/components/modals/FollowersListModal";
import FollowingListModal from "@/components/modals/FollowingListModal";
import PostCardLoader from "@/components/loaders/PostCardLoader";
import PostCard from "@/components/cards/PostCard";
import CreatePostModal from "@/components/modals/CreatePostModal";

const ProfilePage = () => {
  const [postType, setPostType] = useState(true);

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

  const { data: getUserPostFeed, isLoading } = useQuery({
    queryKey: ["getUserPostFeed"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `/api/posts/user/${authenticatedUser?.username}`
        );
        const responseData = await response.json();
        if (responseData?.status == "error") {
          return null;
        }
        if (!response.ok) {
          throw new Error(responseData.message || "Something went wrong!");
        }
        return responseData?.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  const { data: getUserLikedPost } = useQuery({
    queryKey: ["getUserLikedPost"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `/api/posts/likes/${authenticatedUser?._id}`
        );
        const responseData = await response.json();
        if (responseData?.status == "error") {
          return null;
        }
        if (!response.ok) {
          throw new Error(responseData.message || "Something went wrong!");
        }
        return responseData?.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

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
                />
                <FollowingListModal
                  FollowingCount={authenticatedUser?.followings?.length}
                  UserId={authenticatedUser?._id}
                  isCurrentUser={true}
                />
              </div>
            </div>
          </div>

          {/* personal feed */}
          <div className="w-full h-fit flex flex-col">
            <div className="w-full h-12 border-b border-slate-300 dark:border-slate-500 flex flex-row items-center transition-all ease-in-out duration-200">
              <div
                className="w-1/2 h-full cursor-pointer flex items-center justify-center"
                onClick={() => setPostType(true)}
              >
                <div
                  className={`w-fit h-full px-5 flex items-center border-b-4  font-semibold  ${
                    postType
                      ? "border-slate-800 dark:border-slate-300 text-slate-700 dark:text-white"
                      : "border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  My Posts
                </div>
              </div>
              <div
                className="w-1/2 h-full cursor-pointer flex items-center justify-center"
                onClick={() => setPostType(false)}
              >
                <div
                  className={`w-fit h-full px-5 flex items-center border-b-4  font-semibold  ${
                    !postType
                      ? "border-slate-800 dark:border-slate-300 text-slate-700 dark:text-white"
                      : "border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Liked Posts
                </div>
              </div>
            </div>

            {postType ? (
              <div className="mt-4 h-fit pr-1">
                {getUserPostFeed?.length == 0 ? (
                  <div className="w-full px-10 h-[240px] flex items-center justify-center bg-slate-100 dark:bg-[#27272a] rounded-md flex-col">
                    <h2 className="text-lg font-bold">No post yet</h2>
                    <p className="text-center text-pretty">
                      Your voice matters! Don't miss the chance to share your
                      unique perspective with the world. Whether it's a thought,
                      a story, or a simple moment from your day, your posts can
                      inspire and connect with others.
                    </p>
                    <div className="mt-5 w-fit">
                      <CreatePostModal />
                    </div>
                  </div>
                ) : isLoading ? (
                  <PostCardLoader count={1} />
                ) : (
                  getUserPostFeed &&
                  getUserPostFeed.map((post) => (
                    <PostCard key={post._id} posts={post} />
                  ))
                )}
              </div>
            ) : (
              <div className="mt-4 h-fit pr-1">
                {getUserLikedPost?.length == 0 ? (
                  <div className="w-full px-10 h-[240px] flex items-center justify-center bg-slate-100 dark:bg-[#27272a] rounded-md flex-col">
                    <h2 className="text-lg font-bold">
                      You haven't liked any post.
                    </h2>
                    <p className="text-center text-pretty">
                      Your voice matters! Don't miss the chance to share your
                      unique perspective with the world. Whether it's a thought,
                      a story, or a simple moment from your day, your posts can
                      inspire and connect with others.
                    </p>
                  </div>
                ) : (
                  getUserLikedPost &&
                  getUserLikedPost.map((post) => (
                    <PostCard key={post._id} posts={post} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <WhoToFollow createPostVisible={true} />
    </>
  );
};

export default ProfilePage;
