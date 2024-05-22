import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import SpinLoader from '../loaders/SpinLoader';
import { Textarea } from '../ui/textarea';

const PostDetailCommentForm = ({ postId }) => {
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
            queryKey: ["getSinglePostDetails"],
          });
          queryClient.invalidateQueries({
            queryKey: ["getUserPostFeed"],
          });
          queryClient.invalidateQueries({
            queryKey: ["getUserLikedPost"],
          });
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
    <div className="w-full h-full flex flex-row items-start justify-around gap-2">
      <div className="w-fit h-full flex items-start flex-col">
        <img
          src={authenticatedUser?.profileImage || "/avatar-placeholder.png"}
          alt={authenticatedUser?.fullname}
          className="w-11 h-11 rounded-full object-cover"
        />
      </div>
      <div className="w-[88%] h-fit flex items-start flex-col gap-2 pr-2">
        <Textarea
          placeholder="Comment your thoughts on this post..."
          name="comment"
          onChange={handleInputStateChange}
          className="dark:bg-[#09090b] text-sm resize-none h-[80px] font-normal"
          value={formState.comment}
        />
      </div>
    </div>
    <Button className="h-7 text-sm font-semibold ml-auto mr-3" disabled={isPending}>
      {isPending ? <SpinLoader /> : "Comment"}
    </Button>
  </form>
  )
}

export default PostDetailCommentForm