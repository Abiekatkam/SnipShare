import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaFacebook,
  FaLink,
} from "@/components/constants/Icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProfilePageLinks = ({authenticatedUser}) => {

  const isLinkUrlPresent = (authenticatedUser.websiteurl ? true : false);
  const isGithubUrlPresent = (authenticatedUser.githuburl ? true : false);
  const isFacebookUrlPresent = (authenticatedUser.facebookurl
    ? true
    : false);
  const isLinkedinUrlPresent = (authenticatedUser.linkedinurl
    ? true
    : false);
  const isInstagramUrlPresent = (authenticatedUser.instagramurl
    ? true
    : false);
  const isTwitterUrlPresent = (authenticatedUser.twitterurl
    ? true
    : false);

  return (
    <div className="w-fit h-fit mt-3 flex flex-row items-start gap-2">
      {isLinkUrlPresent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={authenticatedUser?.websiteurl}
                className="text-lg text-slate-700 dark:text-slate-400 hover:opacity-70"
                target="_blank"
              >
                <FaLink />
              </a>
            </TooltipTrigger>
            <TooltipContent className="p-2 dark:bg-[#09090b]">
              <p>Professional Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {isLinkedinUrlPresent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={authenticatedUser?.linkedinurl}
                className="text-lg text-slate-700 dark:text-slate-400 hover:opacity-70"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            </TooltipTrigger>
            <TooltipContent className="p-2 dark:bg-[#09090b]">
              <p>Linkedin Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {isTwitterUrlPresent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={authenticatedUser?.twitterurl}
                className="text-md text-slate-700 dark:text-slate-400 hover:opacity-70"
                target="_blank"
              >
                <FaXTwitter />
              </a>
            </TooltipTrigger>
            <TooltipContent className="p-2 dark:bg-[#09090b]">
              <p>Twitter Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {isGithubUrlPresent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={authenticatedUser?.githuburl}
                className="text-lg text-slate-700 dark:text-slate-400 hover:opacity-70"
                target="_blank"
              >
                <FaGithub />
              </a>
            </TooltipTrigger>
            <TooltipContent className="p-2 dark:bg-[#09090b]">
              <p>Github Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {isFacebookUrlPresent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={authenticatedUser?.facebookurl}
                className="text-lg text-slate-700 dark:text-slate-400 hover:opacity-70"
                target="_blank"
              >
                <FaFacebook />
              </a>
            </TooltipTrigger>
            <TooltipContent className="p-2 dark:bg-[#09090b]">
              <p>Facebook Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {isInstagramUrlPresent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={authenticatedUser?.instagramurl}
                className="text-md text-slate-700 dark:text-slate-400 hover:opacity-70"
                target="_blank"
              >
                <FaInstagram />
              </a>
            </TooltipTrigger>
            <TooltipContent className="p-2 dark:bg-[#09090b]">
              <p>Instagram Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ProfilePageLinks;
