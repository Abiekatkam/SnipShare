import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreatePostForm from "@/components/forms/CreatePostForm";

const CreatePostModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#09090b] dark:bg-white font-bold text-md flex items-center gap-2">
          <span>Create Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:min-h-[280px] sm:max-h-[500px] p-4 dark:bg-[#09090b]">
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
          <DialogDescription>
            Capture moments, share ideas, and connect with others. Create a
            post.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full min-h-[212px] h-full">
          <CreatePostForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
