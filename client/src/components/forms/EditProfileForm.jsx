import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { TbCameraPlus } from "@/components/constants/Icons";
import { toast } from "react-toastify";
import SpinLoader from "../loaders/SpinLoader";
import { DialogClose } from "../ui/dialog";

const EditProfileForm = () => {
  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  const [formState, setFormState] = useState({
    fullname: authenticatedUser?.fullname || "",
    username: authenticatedUser?.username || "",
    profileImage: authenticatedUser?.profileImage || "/avatar-placeholder.png",
    coverImage: authenticatedUser?.coverImage || "/cover.png",
    bio: authenticatedUser?.bio || "",
    githuburl:
      authenticatedUser.githuburl != "" ? authenticatedUser.githuburl : "",
    linkedinurl:
      authenticatedUser.linkedinurl != "" ? authenticatedUser.linkedinurl : "",
    websiteurl:
      authenticatedUser.websiteurl != "" ? authenticatedUser.websiteurl : "",
    facebookurl:
      authenticatedUser.facebookurl != "" ? authenticatedUser.facebookurl : "",
    twitterurl:
      authenticatedUser.twitterurl != "" ? authenticatedUser.twitterurl : "",
    instagramurl:
      authenticatedUser.instagramurl != ""
        ? authenticatedUser.instagramurl
        : "",
  });
  const [isValidRemoveProfileImage, setIsValidRemoveProfileImage] =
    useState(false);
  const [isValidRemoveCoverImage, setIsValidRemoveCoverImage] = useState(false);

  const maxUrlLimit = 100;
  const maxBioLimit = 230;
  const profileImageFileRef = useRef(null);
  const coverImageFileRef = useRef(null);
  const editProfileModalCloseRef = useRef(null);

  const handleProfileImageFileClick = () => {
    profileImageFileRef.current.click();
  };
  const handleCoverImageFileClick = () => {
    coverImageFileRef.current.click();
  };

  const handleInputStateChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState((prevState) => ({
          ...prevState,
          coverImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setIsValidRemoveCoverImage(true);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState((prevState) => ({
          ...prevState,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setIsValidRemoveProfileImage(true);
    }
  };

  const handleProfileImageRemove = () => {
    setFormState((prevState) => ({
      ...prevState,
      profileImage: "/avatar-placeholder.png",
    }));
    setIsValidRemoveProfileImage(false);
  };

  const handleCoverImageRemove = () => {
    setFormState((prevState) => ({
      ...prevState,
      coverImage: "/cover.png",
    }));
    setIsValidRemoveCoverImage(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = isFormValid();
    if (isValid) {
      if (formState.coverImage == "/cover.png") {
        formState.coverImage = "";
      }
      if (formState.profileImage == "/avatar-placeholder.png") {
        formState.profileImage = "";
      }
      EditProfileMutation(formState);
    }
  };

  const isFormValid = () => {
    let isValid = true;
    if (formState.bio.length > maxBioLimit) {
      toast.error("Bio length exceeds the limit");
      isValid = false;
      return isValid;
    }

    const urls = [
      { name: "LinkedIn", url: formState.linkedinurl },
      { name: "Twitter", url: formState.twitterurl },
      { name: "GitHub", url: formState.githuburl },
      { name: "Facebook", url: formState.facebookurl },
      { name: "Instagram", url: formState.instagramurl },
      { name: "Website", url: formState.websiteurl },
    ];

    for (const { name, url } of urls) {
      if (url.length > maxUrlLimit) {
        toast.error(`${name} URL length exceeds the limit`);
        isValid = false;
        return isValid;
      }

      if (formState.websiteurl && name === "Website") {
        if (!/^https?:\/\//i.test(url)) {
          toast.error("Please enter a valid website link");
          isValid = false;
          return isValid;
        }
      }

      if (
        formState.linkedinurl &&
        name === "LinkedIn" &&
        !/linkedin/.test(url)
      ) {
        toast.error("Please enter a valid Linkedin account link");
        isValid = false;
        return isValid;
      }
      if (formState.twitterurl && name === "Twitter" && !/twitter/.test(url)) {
        toast.error("Please enter a valid Twitter account link");
        isValid = false;
        return isValid;
      }
      if (formState.githuburl && name === "GitHub" && !/github/.test(url)) {
        toast.error("Please enter a valid Github account link");
        isValid = false;
        return isValid;
      }
      if (
        formState.facebookurl &&
        name === "Facebook" &&
        !/facebook/.test(url)
      ) {
        toast.error("Please enter a valid Facebook account link");
        isValid = false;
        return isValid;
      }
      if (
        formState.instagramurl &&
        name === "Instagram" &&
        !/instagram/.test(url)
      ) {
        toast.error("Please enter a valid Instagram account link");
        isValid = false;
        return isValid;
      }
    }
    return isValid;
  };

  const queryClient = useQueryClient();

  const { mutate: EditProfileMutation, isPending } = useMutation({
    mutationFn: async ({
      fullname,
      username,
      email,
      bio,
      websiteurl,
      facebookurl,
      linkedinurl,
      twitterurl,
      githuburl,
      instagramurl,
      profileImage,
      coverImage,
    }) => {
      try {
        const response = await fetch("/api/users/update-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname,
            username,
            email,
            bio,
            websiteurl,
            facebookurl,
            linkedinurl,
            twitterurl,
            githuburl,
            instagramurl,
            profileImage,
            coverImage,
          }),
        });
        const data = await response.json();
        if (data.status == "error") {
          return toast.error(data.message);
        }

        if (data.status == "success") {
          queryClient.invalidateQueries({
            queryKey: ["authorisedCurrentUser"],
          });
          toast.success(data.message);
          editProfileModalCloseRef.current.click();
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    if (formState.coverImage !== "/cover.png") {
      setIsValidRemoveCoverImage(true);
    }
    if (formState.profileImage !== "/avatar-placeholder.png") {
      setIsValidRemoveProfileImage(true);
    }
  }, [formState.coverImage, formState.profileImage]);

  return (
    <>
      <form
        className="w-full h-full flex flex-col items-start justify-between"
        onSubmit={handleFormSubmit}
      >
        <div className="w-full h-[455px] overflow-y-scroll flex flex-col items-center px-2">
          <div className="w-full min-h-[200px] relative">
            <div className="w-full h-[160px] rounded-md relative bg-slate-200 dark:bg-slate-600">
              <img
                src={formState?.coverImage}
                alt=""
                className="w-full h-full object-cover rounded-md opacity-70"
              />

              <span
                className="absolute z-10 left-[48%] top-[35%] border cursor-pointer border-slate-800 hover:shadow-xl transition-all ease-in duration-200 rounded-full p-2 text-xl text-slate-800 bg-slate-700/50"
                onClick={handleCoverImageFileClick}
              >
                <TbCameraPlus />
              </span>
              <input
                type="file"
                accept="image/*"
                ref={coverImageFileRef}
                className="hidden"
                onChange={handleCoverImageChange}
              />
            </div>
            <div className="absolute w-24 h-24 rounded-full bg-slate-400 z-10 -bottom-2 left-2 border-4 border-slate-400 dark:border-slate-300">
              <img
                src={formState.profileImage}
                alt=""
                className="w-full h-full object-cover rounded-full opacity-70"
              />
              <span
                className="absolute z-10 left-[30%] top-[33%] border cursor-pointer border-slate-800 hover:shadow-xl transition-all ease-in duration-200 rounded-full p-2 text-lg text-slate-800 bg-slate-800/50"
                onClick={handleProfileImageFileClick}
              >
                <TbCameraPlus />
              </span>
              <input
                type="file"
                accept="image/*"
                ref={profileImageFileRef}
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </div>
            {isValidRemoveCoverImage && (
              <Button
                type="button"
                variant="outline"
                className="absolute right-0 bottom-0 h-5 p-0 outline-none border-0 capitalize text-xs border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#09090a]"
                onClick={handleCoverImageRemove}
              >
                remove cover image
              </Button>
            )}
            {isValidRemoveProfileImage && (
              <Button
                type="button"
                variant="outline"
                className="absolute right-32 bottom-0 h-5 p-0 outline-none border-0 capitalize text-xs border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#09090a]"
                onClick={handleProfileImageRemove}
              >
                remove profile image
              </Button>
            )}{" "}
          </div>

          <label className="mb-1 block mt-6 w-full">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
              Full Name
            </span>
            <input
              className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              inputMode="text"
              type="text"
              name="fullname"
              onChange={handleInputStateChange}
              value={formState.fullname}
              placeholder="Please enter full name"
              required
            />
          </label>
          <label className="mb-1 block mt-3 w-full">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
              Username
            </span>
            <input
              className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              inputMode="text"
              type="text"
              autoComplete="off"
              name="username"
              onChange={handleInputStateChange}
              value={formState.username}
              placeholder="Please enter a valid name"
              required
            />
          </label>
          <label className="mb-1 block mt-3 w-full">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
              Bio
            </span>
            <Textarea
              placeholder=""
              name="bio"
              className="dark:bg-[#09090b] resize-none min-h-[120px] rounded-md bg-white px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              value={formState.bio}
              onChange={handleInputStateChange}
            />
            <span
              className={`text-xs font-semibold flex justify-end mt-2 ${
                formState?.bio.length > { maxBioLimit }
                  ? "text-red-500 dark:text-red-500"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {formState?.bio.length} / {maxBioLimit}
            </span>
          </label>
          <label className="mb-1 block w-full">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 capitalize dark:text-slate-300">
              Professional website url
            </span>
            <input
              className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              inputMode="text"
              type="text"
              autoComplete="off"
              name="websiteurl"
              onChange={handleInputStateChange}
              value={formState.websiteurl}
              placeholder=""
            />
            <span
              className={`text-xs font-semibold text-slate-500 dark:text-slate-400 flex justify-end mt-2 ${
                formState?.websiteurl.length > maxUrlLimit
                  ? "text-red-500 dark:text-red-500"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {formState?.websiteurl.length} / {maxUrlLimit}
            </span>
          </label>
          <label className="mb-1 block w-full">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 capitalize dark:text-slate-300">
              Linkedin url
            </span>
            <input
              className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              inputMode="text"
              type="text"
              autoComplete="off"
              name="linkedinurl"
              onChange={handleInputStateChange}
              value={formState.linkedinurl}
              placeholder=""
            />
            <span
              className={`text-xs font-semibold text-slate-500 dark:text-slate-400 flex justify-end mt-2 ${
                formState?.linkedinurl.length > maxUrlLimit
                  ? "text-red-500 dark:text-red-500"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {formState?.linkedinurl.length} / {maxUrlLimit}
            </span>
          </label>
          <label className="mb-1 block w-full">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 capitalize dark:text-slate-300">
              Twitter url
            </span>
            <input
              className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              inputMode="text"
              type="text"
              autoComplete="off"
              name="twitterurl"
              onChange={handleInputStateChange}
              value={formState.twitterurl}
              placeholder=""
            />
            <span
              className={`text-xs font-semibold text-slate-500 dark:text-slate-400 flex justify-end mt-2 ${
                formState?.twitterurl.length > maxUrlLimit
                  ? "text-red-500 dark:text-red-500"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {formState?.twitterurl.length} / {maxUrlLimit}
            </span>
          </label>
          <label className="mb-1 block w-full">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 capitalize dark:text-slate-300">
              Github url
            </span>
            <input
              className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              inputMode="text"
              type="text"
              autoComplete="off"
              name="githuburl"
              onChange={handleInputStateChange}
              value={formState.githuburl}
              placeholder=""
            />
            <span
              className={`text-xs font-semibold text-slate-500 dark:text-slate-400 flex justify-end mt-2 ${
                formState?.githuburl.length > maxUrlLimit
                  ? "text-red-500 dark:text-red-500"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {formState?.githuburl.length} / {maxUrlLimit}
            </span>
          </label>
          <label className="mb-1 block w-full">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 capitalize dark:text-slate-300">
              Facebook url
            </span>
            <input
              className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              inputMode="text"
              type="text"
              autoComplete="off"
              name="facebookurl"
              onChange={handleInputStateChange}
              value={formState.facebookurl}
              placeholder=""
            />
            <span
              className={`text-xs font-semibold text-slate-500 dark:text-slate-400 flex justify-end mt-2 ${
                formState?.facebookurl.length > maxUrlLimit
                  ? "text-red-500 dark:text-red-500"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {formState?.facebookurl.length} / {maxUrlLimit}
            </span>
          </label>
          <label className="mb-1 block w-full">
            <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 capitalize dark:text-slate-300">
              Instagram url
            </span>
            <input
              className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              inputMode="text"
              type="text"
              autoComplete="off"
              name="instagramurl"
              onChange={handleInputStateChange}
              value={formState.instagramurl}
              placeholder=""
            />
            <span
              className={`text-xs font-semibold text-slate-500 dark:text-slate-400 flex justify-end mt-2 ${
                formState?.instagramurl.length > maxUrlLimit
                  ? "text-red-500 dark:text-red-500"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {formState?.instagramurl.length} / {maxUrlLimit}
            </span>
          </label>
        </div>
        <Button
          className="w-fit ml-auto mt-4 h-8 font-bold bg-[#09090b] dark:bg-white"
          disabled={isPending}
        >
          {isPending ? <SpinLoader /> : "Save changes"}
        </Button>
      </form>
      <DialogClose asChild>
        <Button
          type="button"
          variant="secondary"
          className="hidden"
          ref={editProfileModalCloseRef}
        >
          Close
        </Button>
      </DialogClose>
    </>
  );
};

export default EditProfileForm;
