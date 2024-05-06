import WhoToFollow from "@/components/aside/WhoToFollow";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r border-slate-300 dark:border-slate-500 min-h-screen p-4">
        <div className="w-full h-full flex flex-col items-start">
          <div className="w-full h-[415px] flex flex-col items-center justify-start border-b border-slate-300 dark:border-slate-500">
            <div className="w-full h-[200px] relative">
              <div className="w-full h-full bg-slate-200 dark:bg-slate-600">
                <img
                  src="https://images.unsplash.com/photo-1528465424850-54d22f092f9d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute w-40 h-40 rounded-full bg-slate-400 z-10 -bottom-20 left-4 border-4 border-slate-200 dark:border-slate-300">
                <img src="/avatar-placeholder.png" alt="" className="w-full h-full object-cover rounded-full" />
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
