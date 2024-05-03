import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

const AccountPrivacy = () => {
  return (
    <Card className="w-full dark:bg-[#09090b]">
      <CardHeader className="p-4 pb-2">
        <h2 className="font-semibold text-primary dark:text-white">
          Account Privacy
        </h2>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="w-full flex items-center space-x-3">
          <Switch id="account-privacy" />
          <Label htmlFor="account-privacy" className="text-sm text-slate-500 dark:text-slate-300">
            Enhance your privacy settings by making your account private. Would
            you like to take control of who sees your content?
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountPrivacy;
