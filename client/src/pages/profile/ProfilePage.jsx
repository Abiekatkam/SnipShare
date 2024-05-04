import WhoToFollow from "@/components/aside/WhoToFollow";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r border-slate-300 dark:border-slate-500 min-h-screen p-4">
        <div className="w-full h-full flex flex-col items-start">
          <div className="w-full h-[62px] flex items-center justify-start border-b border-slate-300 dark:border-slate-500">
            <h1 className="text-2xl font-semibold capitalize leading-snug tracking-tight">
              Profile
            </h1>
          </div>

          <div className="mt-6 w-full overflow-x-auto p-4 pt-3">
            <div className="m-auto flex w-full max-w-2xl flex-col items-center space-y-6"></div>
          </div>
        </div>
      </div>
      <WhoToFollow />
    </>
  );
};

export default ProfilePage;
