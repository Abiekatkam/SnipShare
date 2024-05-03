import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Avatar from "../../../public/avatar-placeholder.png";
import { Separator } from "../ui/separator";
import {
  IoImageOutline,
  IoClose,
  FaRegFaceSmile,
} from "@/components/constants/Icons";
import SpinLoader from "../loaders/SpinLoader";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import "emoji-picker-element";

const CreatePostForm = () => {
  const [formState, setFormState] = useState({
    description: "",
  });
  const [source, setSource] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const maxDescriptionLength = 280;
  const remainingChars = maxDescriptionLength - formState.description.length;

  const handleInputStateChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const imageFileInputRef = useRef(null);
  const loader = false;
  const theme = localStorage.getItem("vite-ui-theme");

  const handleImageFileClick = () => {
    imageFileInputRef.current.click();
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSource(file);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSource(null);
    setPreviewUrl(null);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      description: prevFormState.description + emojiObject.emoji,
    }));
  };

  return (
    <form
      className="w-full h-full flex flex-col items-start justify-bewteen gap-2"
      onSubmit={handleFormSubmit}
    >
      <div className="w-full h-full flex flex-row items-start justify-start gap-2">
        <div className="w-fit h-full flex items-start flex-col">
          <img
            src={Avatar}
            alt=""
            className="w-11 h-11 rounded-full object-contain"
          />
        </div>
        <div className="w-[90%] h-fit max-h-[340px] flex items-start flex-col overflow-y-scroll gap-2">
          <Textarea
            placeholder="Share your story, idea, or question here..."
            autoFocus
            name="description"
            onChange={handleInputStateChange}
            className="border-0 dark:bg-[#09090b] resize-none focus-visible:ring-0 ring-0 min-h-[160px] focus-visible:ring-offset-0 text-lg font-normal leading-snug tracking-tight"
            value={formState.description}
          />

          {previewUrl && (
            <div className=" mx-2 relative rounded-lg object-contain">
              <button
                className="absolute cursor-pointer z-10 top-1 border shadow-xl right-1 w-8 flex items-center justify-center bg-[#09090b] text-white dark:text-[#09090b] dark:bg-white h-8 text-xl rounded-full"
                onClick={handleRemoveFile}
              >
                <IoClose />
              </button>
              {source.type.includes("image") ? (
                <img src={previewUrl} alt="Preview" className="rounded-lg" />
              ) : (
                <video
                  autoPlay
                  controls
                  controlsList="nodownload nofullscreen"
                  className="rounded-lg"
                >
                  <source src={previewUrl} type={source.type} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
        </div>
      </div>
      <Separator className="my-2" />
      <div className="w-full h-1/3 flex flex-row items-center justify-between">
        <div className="w-fit flex items-center gap-2">
          <input
            type="file"
            accept="image/*, video/*"
            ref={imageFileInputRef}
            className="hidden"
            onChange={handleImageFileChange}
          />
          <button
            className="w-8 h-8 text-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 dark:hover:text-slate-50 hover:text-slate-800 transition-all ease-in duration-200"
            onClick={handleImageFileClick}
          >
            <IoImageOutline />
          </button>
          <Popover>
            <PopoverTrigger>
              <button className="w-8 h-8 text-xl flex items-center justify-center text-slate-600 dark:text-slate-400 dark:hover:text-slate-50 hover:text-slate-800 transition-all ease-in duration-200">
                <FaRegFaceSmile />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0">
              <emoji-picker emoji-version="15.0" onClick={handleEmojiClick}></emoji-picker>
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-fit flex items-center gap-3">
          <p className="text-[#09090b] dark:text-white font-semibold">
            {remainingChars}{" "}
            <span className="font-normal">characters left</span>
          </p>
          <Button className="h-9 font-semibold" disabled={loader}>
            {loader ? <SpinLoader /> : "Post"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
