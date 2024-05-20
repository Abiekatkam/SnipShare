import React, { useRef, useState } from "react";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import SpinLoader from "../loaders/SpinLoader";
import { Textarea } from "../ui/textarea";
import { IoClose } from "@/components/constants/Icons";
import { Separator } from "../ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const EditPostForm = ({ data }) => {
  const maxDescriptionLimit = 250;

  const editPostModalCloseRef = useRef(null);
  const imageFileRef = useRef(null);

  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    description: data?.text || "",
    image: data?.image || null,
    sourceType: data?.sourceType || "",
    postId: data?._id,
  });

  const handleInputStateChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormState({
          ...formState,
          image: reader.result,
          sourceType: fileType,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileClick = () => {
    imageFileRef.current.click();
  };

  const handleRemoveFile = () => {
    setFormState({
      ...formState,
      image: null,
      sourceType: "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    EditPostMutation(formState);
  };

  const { mutate: EditPostMutation, isPending: isEditPending } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch("/api/posts/edit", {
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
            queryKey: ["authorisedCurrentUser"],
          });
          queryClient.invalidateQueries({
            queryKey: ["getUserPostFeed"],
          });
          queryClient.invalidateQueries({
            queryKey: ["getUserLikedPost"],
          });
          if (!isEditPending) {
            editPostModalCloseRef.current.click();
          }
          toast.success(responseData?.message);
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
      }
    },
  });

  const handleDeletePost = async (e) => {
    e.preventDefault();
    DeletePostMutation();
  };

  const { mutate: DeletePostMutation, isPending: isDeletePending } =
    useMutation({
      mutationFn: async () => {
        try {
          const response = await fetch(`/api/posts/${data?._id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          });
          const responseData = await response.json();
          if (responseData.status === "success") {
            queryClient.invalidateQueries({
              queryKey: ["getAllPostFeed"],
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
            if (!isDeletePending) {
              editPostModalCloseRef.current.click();
            }
            toast.success(responseData?.message);
          }
        } catch (error) {
          toast.error("Something went wrong! Please try again.");
        }
      },
    });

  return (
    <>
      <form
        className="w-full h-full flex flex-col items-start justify-between"
        onSubmit={handleFormSubmit}
      >
        <div className="w-full h-[455px] overflow-y-scroll flex flex-col items-center px-2 mb-2">
          <label className="mb-1 block mt-3 w-full">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
              Description
            </span>
            <Textarea
              placeholder="Enter a nice descriptive text here."
              name="description"
              className="dark:bg-[#09090b] resize-none min-h-[120px] rounded-md bg-white px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              value={formState.description}
              onChange={handleInputStateChange}
            />
            <span
              className={`text-xs font-semibold flex justify-end mt-2 ${
                formState?.description.length > maxDescriptionLimit
                  ? "text-red-500 dark:text-red-500"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {formState?.description.length} / {maxDescriptionLimit}
            </span>
          </label>
          <div className="mb-1 mt-3 w-full flex flex-col">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
              Attachments
            </span>

            <div className="w-full relative h-fit rounded-md">
              {formState?.image && (
                <button
                  type="button"
                  className="absolute cursor-pointer z-10 top-1 border shadow-xl right-1 w-8 flex items-center justify-center bg-[#09090b] text-white dark:text-[#09090b] dark:bg-white h-8 text-xl rounded-full"
                  onClick={handleRemoveFile}
                >
                  <IoClose />
                </button>
              )}
              {formState?.image ? (
                formState?.sourceType === "image" ? (
                  <img
                    src={formState?.image}
                    alt=""
                    className="w-full h-full rounded-lg object-contain"
                  />
                ) : (
                  <video
                    autoPlay
                    controls
                    controlsList="nodownload nofullscreen"
                    className="w-full h-full rounded-lg object-contain"
                  >
                    <source
                      src={formState?.image}
                      type={formState?.sourceType}
                    />
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="py-4 text-sm flex items-center justify-center">
                  No attachments have been added yet. Enhance the appearance of
                  your feed by adding some attachments!
                </div>
              )}
            </div>

            <div className="w-fit flex items-center gap-2">
              <input
                type="file"
                accept="image/*, video/*"
                ref={imageFileRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                className="p-0 w-fit outline-none mt-2 h-6 border-0 capitalize text-xs border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#09090a]"
                onClick={handleFileClick}
              >
                {formState?.image ? "Change" : "Upload"} attachments
              </Button>
            </div>
          </div>

          <Separator className="my-2" />

          <div className="mb-1 mt-3 w-full flex flex-col rounded-md p-2 border border-red-500">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-red-600">
              Delete this post
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-300 my-1">
              Warning: Deleting this post will remove all actions associated
              with it, including comments, and likes. Are you sure you want to
              proceed?
            </p>
            <Button
              type="button"
              variant="destructive"
              className="w-fit ml-auto mt-2 h-7 text-sm font-bold capitalize"
              disabled={isDeletePending}
              onClick={handleDeletePost}
            >
              {isDeletePending ? <SpinLoader /> : "delete"}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-fit ml-auto mt-4 h-8 font-bold bg-[#09090b] dark:bg-white"
          disabled={isEditPending}
        >
          {isEditPending ? <SpinLoader /> : "Save changes"}
        </Button>
      </form>
      <DialogClose asChild>
        <Button
          type="button"
          variant="secondary"
          className="hidden"
          ref={editPostModalCloseRef}
        >
          Close
        </Button>
      </DialogClose>
    </>
  );
};

export default EditPostForm;
