import React from "react";

const SpinTextLoader = () => {
  return (
    <div className="w-fit flex items-center gap-2">
      <span className="text-3xl font-semibold">Loading</span>
      <div className="w-5 h-5 rounded-full border-2 dark:border-white border-black border-t-transparent animate-spin border-t-0"></div>
    </div>
  );
};

export default SpinTextLoader;
