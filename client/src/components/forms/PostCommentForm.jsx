import React, { useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import SpinLoader from "../loaders/SpinLoader";
import { Textarea } from "../ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DialogClose } from "../ui/dialog";
import { toast } from "react-toastify";

const PostCommentForm = ({ postId }) => {
  const commentPostModalCloseRef = useRef(null);
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    comment: "",
  });

  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  const handleInputStateChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formState.comment !== "") {
      CommentPostMutation(formState);
    } else {
      toast.error("Cannot send an empty comment on this post.");
    }
  };

  const { mutate: CommentPostMutation, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`/api/posts/comment/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });
        const responseData = await response.json();
        if (responseData.status == "error") {
          toast.error(responseData?.message);
        }
        if (responseData.status === "success") {
          queryClient.invalidateQueries({
            queryKey: ["getAllPostFeed"],
          });
          queryClient.invalidateQueries({
            queryKey: ["getAllFollowingPostFeed"],
          });
          queryClient.invalidateQueries({
            queryKey: ["authorisedCurrentUser"],
          });
          queryClient.invalidateQueries({
            queryKey: ["getUserPostFeed"],
          });
          queryClient.invalidateQueries({
            queryKey: ["getUserLikedPost"],
          });
          if (!isPending) {
            commentPostModalCloseRef.current.click();
          }
          toast.success(responseData?.message);
          setFormState({
            comment: "",
          });
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
      }
    },
  });

  return (
    <form
      className="w-full h-full flex flex-col items-start justify-bewteen gap-2"
      onSubmit={handleFormSubmit}
    >
      <div className="w-full h-full flex flex-row items-start justify-start gap-2">
        <div className="w-fit h-full flex items-start flex-col">
          <img
            src={authenticatedUser?.profileImage || "/avatar-placeholder.png"}
            alt={authenticatedUser?.fullname}
            className="w-11 h-11 rounded-full object-cover"
          />
        </div>
        <div className="w-[89%] h-fit max-h-[340px] flex items-start flex-col overflow-y-scroll gap-2 pr-2">
          <Textarea
            placeholder="Comment your thoughts on this post..."
            autoFocus
            name="comment"
            onChange={handleInputStateChange}
            className="border-0 dark:bg-[#09090b] resize-none focus-visible:ring-0 ring-0 min-h-[160px] focus-visible:ring-offset-0 text-lg font-normal leading-snug tracking-tight"
            value={formState.comment}
          />
        </div>
      </div>
      <Separator className="my-2" />
      <Button className="h-8 font-semibold ml-auto" disabled={isPending}>
        {isPending ? <SpinLoader /> : "Comment"}
      </Button>
      <DialogClose asChild>
        <Button
          type="button"
          variant="secondary"
          className="hidden"
          ref={commentPostModalCloseRef}
        >
          Close
        </Button>
      </DialogClose>
    </form>
  );
};

export default PostCommentForm;
