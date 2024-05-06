import SpinLoader from "@/components/loaders/SpinLoader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AccountPrivacy = () => {
  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  const [isValidChanges, setIsValidChanges] = useState(true);
  const [isAccountPrivate, setIsAccountPrivate] = useState(
    authenticatedUser.isAccountPrivate
  );

  const queryClient = useQueryClient();

  const handleIsAcountPrivateChange = () => {
    setIsAccountPrivate((prev) => !prev);
  };

  useEffect(() => {
    if (isAccountPrivate !== authenticatedUser.isAccountPrivate) {
      setIsValidChanges(false);
    } else {
      setIsValidChanges(true);
    }
  }, [isAccountPrivate]);

  const handleAccountPrivacyClick = (e) => {
    e.preventDefault();
    ChangePasswordMutation({isAccountPrivate})
  };

  const { mutate: ChangePasswordMutation, isPending } = useMutation({
    mutationFn: async ({ isAccountPrivate }) => {
      try {
        const response = await fetch("/api/auth/change-privacy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: authenticatedUser.email,
            isAccountPrivate
          }),
        });
        const data = await response.json();
        if (data.status == "error") {
          return toast.error(data.message);
        }

        if (data.status == "success") {
          queryClient.invalidateQueries({
            queryKey: ["authorisedCurrentUser"],
          });
          setIsAccountPrivate(data?.data?.isAccountPrivate)
          setIsValidChanges(true);
          toast.success(data.message);
        }
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <Card className="w-full dark:bg-[#09090b]">
      <CardHeader className="p-4 pb-2">
        <h2 className="font-semibold text-primary dark:text-white">
          Account Privacy
        </h2>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="w-full flex items-center space-x-3">
          <Switch
            id="account-privacy"
            checked={isAccountPrivate}
            onCheckedChange={handleIsAcountPrivateChange}
          />
          <Label
            htmlFor="account-privacy"
            className="text-sm text-slate-500 dark:text-slate-300"
          >
            Enhance your privacy settings by making your account private. Would
            you like to take control of who sees your content?
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="w-fit ml-auto mt-4 h-9 font-bold bg-[#09090b] dark:bg-white"
          disabled={isValidChanges || isPending}
          onClick={handleAccountPrivacyClick}
        >
          {isPending ? <SpinLoader /> : "Save changes"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountPrivacy;
