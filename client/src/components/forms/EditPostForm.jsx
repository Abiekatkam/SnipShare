import React, { useRef, useState } from "react";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import SpinLoader from "../loaders/SpinLoader";
import { Textarea } from "../ui/textarea";

const EditPostForm = ({ data }) => {
  const maxDescriptionLimit = 250;

  const editPostModalCloseRef = useRef(null);
  const imageFileRef = useRef(null);

  const [formState, setFormState] = useState({
    description: data?.text || "",
    image: data?.image || null,
    sourceType: data?.sourceType || "",
  });

  const handleInputStateChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0];
      const fileURL = URL.createObjectURL(file);
      setFormState({
        ...formState,
        image: fileURL,
        sourceType: fileType,
      });
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
  };

  return (
    <>
      <form
        className="w-full h-full flex flex-col items-start justify-between"
        onSubmit={handleFormSubmit}
      >
        <div className="w-full h-[455px] overflow-y-scroll flex flex-col items-center px-2">
          <label className="mb-1 block mt-3 w-full">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
              Description
            </span>
            <Textarea
              placeholder=""
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
          <label className="mb-1 mt-3 w-full flex flex-col">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
              Attachments
            </span>

            <div className="w-full h-fit bg-slate-400 rounded-md flex items-center justify-center">
              {formState?.image &&
                (formState?.sourceType === "image" ? (
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
                    className="rounded-lg"
                  >
                    <source
                      src={formState?.image}
                      type={formState?.sourceType}
                    />
                    Your browser does not support the video tag.
                  </video>
                ))}
            </div>

            <div className="w-fit flex items-center gap-2">
              <input
                type="file"
                accept="image/*, video/*"
                ref={imageFileRef}
                className="hidden w-0 h-0"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                className="p-0 w-fit outline-none mt-2 h-6 border-0 capitalize text-xs border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={handleFileClick}
              >
                {formState?.image ? "Change" : "Upload"} attachments
              </Button>
              {formState?.image && (
                <Button
                  type="button"
                  variant="outline"
                  className="p-0 w-fit outline-none mt-2 h-6 border-0 capitalize text-xs border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  onClick={handleRemoveFile}
                >
                  Remove attachments
                </Button>
              )}
            </div>
          </label>
        </div>
        <Button
          className="w-fit ml-auto mt-4 h-8 font-bold bg-[#09090b] dark:bg-white"
          disabled={false}
        >
          {false ? <SpinLoader /> : "Save changes"}
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
