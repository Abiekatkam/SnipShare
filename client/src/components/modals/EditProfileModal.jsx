import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfileForm from "../forms/EditProfileForm";

const EditProfileModal = () => {
  return (
    <Dialog>
      <DialogTrigger
        variant="outline"
        className="w-fit ml-auto my-3 mb-1 h-8 dark:bg-[#09090b] border px-2 rounded-md border-[#09090b] text-sm dark:border-slate-200"
      >
        Edit Profile
      </DialogTrigger>
      <DialogContent className="dark:bg-[#09090b] p-3 gap-0">
        <DialogHeader className="p-0">
          <DialogTitle className="text-lg">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="w-full min-h-[500px] h-full">
          <EditProfileForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
