
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

import ChangePasswordForm from "@/components/forms/ChangePasswordForm";

const ChangePassword = () => {

  return (
    <Card className="w-full dark:bg-[#09090b]">
      <CardHeader className="p-4 pb-2">
        <h2 className="font-semibold text-primary dark:text-white">
          Change Password
        </h2>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <ChangePasswordForm/>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
