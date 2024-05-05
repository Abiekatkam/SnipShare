import React from "react";
import CreatePostModal from "../modals/CreatePostModal";
import AccountSmCard from "../cards/AccountSmCard";
import { CopyrightYear } from "../constants/Urls";

const WhoToFollow = ({ isHomePage = false }) => {
  return (
    <div className="flex-[3_3_0] w-20 max-w-96 min-h-screen">
      <div className="sticky top-0 left-0 h-screen flex flex-col w-20 md:w-full p-4">
        {/* suggested users */}

        <div className="w-full min-h-[400px] border border-slate-300 dark:border-slate-500 rounded-xl p-3 flex flex-col items-start gap-3">
          <h1 className="text-xl font-bold text-[#09090b] dark:text-slate-50">
            Who to follow
          </h1>
          <AccountSmCard type="follow" />
          <AccountSmCard type="follow" />
          <AccountSmCard type="follow" />
          <AccountSmCard type="follow" />
          <AccountSmCard type="follow" />
        </div>

        {isHomePage && (
          <div className="mt-5 w-full">
            <CreatePostModal />
          </div>
        )}

        <div className="mt-auto">
          <p className="text-xs dark:text-slate-300 text-[#09090b]">
            At {CopyrightYear}, This project is developed by Abhishek Katkam.
            All rights reserved by SnipShare.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoToFollow;