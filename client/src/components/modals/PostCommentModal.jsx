import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FaRegCommentDots } from "@/components/constants/Icons";
import PostCommentForm from "../forms/PostCommentForm";

const PostCommentModal = ({postId, commentLength}) => {
  return (
    <Dialog>
      <DialogTrigger
        variant="outline"
        className="w-fit flex flex-row gap-1 items-center text-sm font-semibold text-slate-500 group  transition-all ease-in duration-200"
      >
        <span className="group-hover:text-sky-500 cursor-pointer">
          <FaRegCommentDots />
        </span>{" "}
        <span className="group-hover:text-sky-500 cursor-pointer">Comments ({commentLength})</span>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#09090b] p-3 gap-0">
        <DialogHeader className="p-0">
          <DialogTitle className="text-lg">Post comment</DialogTitle>
        </DialogHeader>
        <div className="w-full min-h-[230px] h-full">
          <PostCommentForm postId={postId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostCommentModal;
