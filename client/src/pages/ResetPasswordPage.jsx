import { CopyrightYear } from "@/components/constants/Urls";
import { PromotionSocialLinks } from "@/components/constants/Utility";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "@/components/constants/Icons";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <main className="m-auto flex lg:h-[100vh] h-fit w-full flex-col items-center justify-center pl-2 pr-2">
      <div className="m-auto flex w-fit flex-col lg:flex-row justify-center lg:gap-3 lg:p-6 p-2 sm:p-10">
        <div className="lg:w-[480px] w-full flex flex-col items-center justify-center">
          <h1 className="lg:text-8xl text-5xl font-black dancing-script transition-all ease-in duration-200">
            SnipShare.
          </h1>
          <h2 className="lg:text-lg text-md mt-1 font-bold capitalize">
            Connect, Collaborate, Create.
          </h2>

          <Separator className="lg:w-[60%] w-full my-5 bg-slate-950/50" />

          <div className="w-full hidden lg:flex flex-col items-center justify-center text-center">
            <p className="text-xs lg:text-md font-semibold">
              At {CopyrightYear}, This project is developed by Abhishek Katkam.
              All rights reserved by SnipShare.
            </p>
            <div className="w-full flex flex-row items-center justify-center mt-2 gap-4">
              {PromotionSocialLinks.map((links) => (
                <Link
                  to={links.url}
                  key={links.id}
                  target="_blank"
                  className="w-fit"
                >
                  <Button
                    variant="outline"
                    className="lg:h-9 lg:w-9 h-8 w-8 p-2"
                  >
                    {links.name === "Linkedin" && (
                      <FaLinkedin className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Github" && (
                      <FaGithub className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Instagram" && (
                      <FaInstagram className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Twitter" && (
                      <FaXTwitter className="w-[25px] h-[25px]" />
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-[480px] w-full flex flex-col items-center justify-start lg:p-4 lg:pl-6 lg:ml-10">
          <h2 className="lg:text-2xl font-semibold text-lg">Reset Password</h2>
          <ResetPasswordForm />

          <div className="w-full lg:hidden my-4 flex flex-col items-center justify-center text-center">
            <p className="text-xs lg:text-md font-normal">
              At {CopyrightYear}, This project is developed by Abhishek Katkam.
              All rights reserved by SnipShare.
            </p>
            <div className="w-full flex flex-row items-center justify-center mt-2 gap-4">
              {PromotionSocialLinks.map((links) => (
                <Link
                  to={links.url}
                  key={links.id}
                  target="_blank"
                  className="w-fit"
                >
                  <Button
                    variant="outline"
                    className="lg:h-9 lg:w-9 h-8 w-8 p-2"
                  >
                    {links.name === "Linkedin" && (
                      <FaLinkedin className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Github" && (
                      <FaGithub className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Instagram" && (
                      <FaInstagram className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Twitter" && (
                      <FaXTwitter className="w-[25px] h-[25px]" />
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
