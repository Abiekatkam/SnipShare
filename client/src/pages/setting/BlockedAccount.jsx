import AccountSmCard from "@/components/cards/AccountSmCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const BlockedAccount = () => {
  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  return (
    <Card className="w-full dark:bg-[#09090b]">
      <CardHeader className="p-4 pb-2">
        <h2 className="font-semibold text-primary dark:text-white">
          Blocked Accounts
        </h2>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="w-full flex flex-col items-start justify-center gap-3">
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Here is a list of users you've chosen to block. Take control of your
            online experience by managing your blocked list.
          </p>
          {authenticatedUser.BlockedAccount?.length > 0 ? (
            authenticatedUser.BlockedAccount.map((account) => (
              <AccountSmCard key={account?._id} type={"unblock"} />
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-300">
              "No accounts have been blocked by you."
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockedAccount;
