import React from "react";
import { MdEdit } from "@/components/constants/Icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import EditPostForm from "../forms/EditPostForm";

const PostEditModal = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger
        variant="outline"
        className="w-fit h-fit text-lg text-slate-500 dark:text-slate-400 dark:hover:text-white hover:text-[#09090a] transition-all ease-in duration-200"
      >
        <MdEdit />
      </DialogTrigger>
      <DialogContent className="dark:bg-[#09090b] p-3 gap-0">
        <DialogHeader className="p-0">
          <DialogTitle className="text-lg">Edit Post</DialogTitle>
        </DialogHeader>
        <div className="w-full min-h-[500px] h-full">
          <EditPostForm data={data} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditModal;
