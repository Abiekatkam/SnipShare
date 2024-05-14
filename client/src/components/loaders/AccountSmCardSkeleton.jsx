import React from "react";
import { Skeleton } from "../ui/skeleton";

const AccountSmCardSkeleton = ({ count }) => {
  const skeletons = Array.from({ length: count }, (_, index) => index);
  return (
    <>
      {skeletons.map((_, index) => (
        <div className="mt-auto w-full flex items-center justify-start gap-3 rounded-xl p-2 px-3 font-semibold text-lg tracking-wide transition-all ease-in  mb-2" key={index}>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[230px]" />
            <Skeleton className="h-4 w-[180px]" />
          </div>
        </div>
      ))}
    </>
  );
};

export default AccountSmCardSkeleton;
