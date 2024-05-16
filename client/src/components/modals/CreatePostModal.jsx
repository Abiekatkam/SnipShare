import React, { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreatePostForm from "@/components/forms/CreatePostForm";

const CreatePostModal = () => {
  const createPostModalRef = useRef(null);
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
          <CreatePostForm reference={createPostModalRef} />
        </div>
        <DialogClose asChild>
            <Button type="button" variant="secondary" className="hidden" ref={createPostModalRef}> 
              Close
            </Button>
          </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
