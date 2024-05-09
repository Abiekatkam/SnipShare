import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfileFollowUnfollow = ({ followId, isFollowing }) => {
   const [buttonType, setButtonType] = useState(isFollowing);

   console.log(isFollowing, buttonType);
   if(isFollowing != buttonType){
    setButtonType(isFollowing);
   }

  const UpdateFollowUnfollowUser = async () => {
    try {
      const response = await fetch("/api/users/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followerId: followId }),
      });

      const data = await response.json();
      if (data.status == "success") {
        setButtonType(data?.type);
        if (data.show) {
          toast.success(data?.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Button
      onClick={() => UpdateFollowUnfollowUser()}
      className={`w-fit ml-auto mt-3 mb-1 h-8 px-4 text-sm border rounded-md border-[#09090b] dark:border-slate-200 ${
        buttonType == "Follow"
          ? "dark:text-white dark:bg-[#09090b]"
          : "text-[#09090b] bg-white dark:text-white dark:bg-[#09090b] hover:bg-white dark:hover:bg-[#09090b]"
      } `}
    >
      {buttonType}
    </Button>
  );
};

export default ProfileFollowUnfollow;
