import WhoToFollow from "@/components/aside/WhoToFollow";
import NotificationCard from "@/components/cards/NotificationCard";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

const NotificationPage = () => {
  const queryClient = useQueryClient();
  const { data: getNewNotification, isLoading } = useQuery({
    queryKey: ["getNewNotification"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/notifications/");
        const responseData = await response.json();
        if (responseData?.status == "error") {
          return null;
        }
        if (!response.ok) {
          throw new Error(responseData.message || "Something went wrong!");
        }
        return responseData.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  const handleClearAllNotification = async () => {
    try {
      const response = await fetch(`/api/notifications/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData?.status == "error") {
        return null;
      }
      if (!response.ok) {
        throw new Error(responseData.message || "Something went wrong!");
      }
      if (responseData.status == "success") {
        toast.success(responseData.message);
        queryClient.invalidateQueries({
          queryKey: ["getNewNotification"],
        });
      }
      return responseData.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSingleNotification = async (notifyId) => {
    try {
      const response = await fetch(`/api/notifications/single`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notifyId: notifyId }),
      });
      const responseData = await response.json();
      if (responseData?.status == "error") {
        return null;
      }
      if (!response.ok) {
        throw new Error(responseData.message || "Something went wrong!");
      }
      if (responseData.status == "success") {
        toast.success(responseData.message);
        queryClient.invalidateQueries({
          queryKey: ["getNewNotification"],
        });
      }
      return responseData.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r border-slate-300 dark:border-slate-500 min-h-screen p-4">
        <div className="w-full h-full flex flex-col items-start">
          <div className="w-full h-[62px] flex items-center justify-between border-b border-slate-300 dark:border-slate-500">
            <h1 className="text-2xl font-semibold capitalize leading-snug tracking-tight">
              Notifications
            </h1>
            {getNewNotification?.length > 0 && (
              <Button
                type="button"
                variant="outline"
                className="h-5 p-0 outline-none border-0 capitalize text-xs border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={handleClearAllNotification}
              >
                clear all notifications
              </Button>
            )}
          </div>

          <div className="w-full overflow-x-auto p-4 pt-3">
            <div className="m-auto flex w-full max-w-2xl flex-col items-center space-y-2">
              {getNewNotification?.length > 0 ? (
                getNewNotification.map((notify) => (
                  <NotificationCard
                    key={notify?._id}
                    notify={notify}
                    handleSingleNotification={handleSingleNotification}
                  />
                ))
              ) : (
                <div className="w-full h-[200px] flex items-center justify-center rounded-lg bg-slate-100 dark:bg-[#27272b]">
                  <p className="text-slate-600 text-pretty text-center font-semibold text-xl dark:text-slate-300">
                    Enjoy the peace of no notifications. Stay tuned for more
                    updates on Snipshare!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <WhoToFollow />
    </>
  );
};

export default NotificationPage;
