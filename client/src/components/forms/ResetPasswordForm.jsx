import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "@/components/constants/Icons";
import { Button } from "@/components/ui/button";
import SpinLoader from "@/components/loaders/SpinLoader";

const ResetPasswordForm = () => {
  const [formState, setFormState] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [inputTypeNewPassword, setInputTypeNewPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputTypeConfirmPassword, setInputTypeConfirmPassword] =
    useState("password");

  const loader = false;

  const handleToggleNewPassword = () => {
    setShowNewPassword(true);
    setInputTypeNewPassword("text");
    setTimeout(() => {
      setShowNewPassword(false);
      setInputTypeNewPassword("password");
    }, 2000);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(true);
    setInputTypeConfirmPassword("text");
    setTimeout(() => {
      setShowConfirmPassword(false);
      setInputTypeConfirmPassword("password");
    }, 2000);
  };

  const handleInputStateChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <form className="lg:w-[80%] w-[90%]" onSubmit={handleFormSubmit}>
      <label className="mb-1 block mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700">
          New Password
        </span>
        <div className="relative">
          <input
            className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-400 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900"
            autoFocus
            inputMode="password"
            type={inputTypeNewPassword}
            name="newpassword"
            autoComplete="current-password"
            onChange={handleInputStateChange}
            value={formState.newpassword}
            placeholder="********"
            required
          />
          <button
            type="button"
            className={`absolute inset-y-0 right-0 items-center text-slate-500 px-2 ${
              formState.newpassword.length > 1 ? "flex" : "hidden"
            }`}
            onClick={handleToggleNewPassword}
          >
            {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      </label>
      <label className="mb-1 block mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700">
          Confirm Password
        </span>
        <div className="relative">
          <input
            className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-400 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900"
            inputMode="password"
            type={inputTypeConfirmPassword}
            name="confirmpassword"
            autoComplete="current-password"
            onChange={handleInputStateChange}
            value={formState.confirmpassword}
            placeholder="********"
            required
          />
          <button
            type="button"
            className={`absolute inset-y-0 right-0 items-center text-slate-500 px-2 ${
              formState.confirmpassword.length > 1 ? "flex" : "hidden"
            }`}
            onClick={handleToggleConfirmPassword}
          >
            {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      </label>
      <Button
        className="w-full mt-4 h-8 lg:h-10 font-bold bg-[#09090b]"
        disabled={loader}
      >
        {loader ? <SpinLoader /> : "Update password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
