import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import PostDetailCommentForm from "../forms/PostDetailCommentForm";
import PostCommentCard from "../cards/PostCommentCard";

const PostDetailModal = ({ posts }) => {
  return (
    <Dialog>
      <DialogTrigger
        variant="outline"
        className="w-full h-fit flex flex-col items-start cursor-pointer transition-all ease-in duration-200 text-start"
      >
        {posts?.text && (
          <div className="w-full h-fit py-2">
            <p className="text-pretty text-md">{posts?.text}</p>
          </div>
        )}
        {posts?.image && posts?.sourceType === "image" ? (
          <div className="w-full h-fit pt-2">
            <img
              src={posts?.image}
              alt="post image"
              className="w-full h-fit object-contain rounded-md"
            />
          </div>
        ) : (
          <div className="w-full h-fit pt-2">
            <video
              autoPlay
              controls
              controlsList="nodownload nofullscreen"
              className="w-full h-full rounded-lg object-contain"
            >
              <source src={formState?.image} type={formState?.sourceType} />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="dark:bg-[#09090b] max-w-[920px] p-3 gap-0">
        <DialogHeader className="p-0">
          <DialogTitle className="text-lg">Post Details</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full flex items-start justify-between">
          <div className="w-[54%] h-full bg-[#09090a] flex items-center justify-center">
            {posts?.image &&
            posts?.sourceType === "image" ? (
              <div className="w-full h-fit pt-2">
                <img
                  src={posts?.image}
                  alt="post image"
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
            ) : (
              <div className="w-full h-fit pt-2">
                <video
                  autoPlay
                  controls
                  controlsList="nodownload nofullscreen"
                  className="w-full h-full rounded-lg object-contain"
                >
                  <source
                    src={posts?.image}
                    type={posts?.sourceType}
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
          <div className="w-[45%] max-h-[500px] h-[500px] flex flex-col items-start">
            <div className="w-full h-[140px] flex items-start">
              <PostDetailCommentForm postId={posts?._id} />
            </div>
            <Separator className="my-1" />
            <div className="w-full h-[350px] flex flex-col overflow-y-scroll pr-2">
              <p className="text-sm font-semibold mb-2">
                Comments ({posts?.comments?.length})
              </p>
              {posts?.comments?.length > 0 ? (
                posts?.comments?.map((comments) => (
                  <PostCommentCard commentData={comments} key={comments?._id} />
                ))
              ) : (
                <div className="w-full h-[150px] bg-slate-50 dark:bg-[#27272a] rounded-md flex items-center justify-center">
                  <p className="text-center text-sm text-pretty font-semibold">
                    Be the first to comment on this post.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailModal;
