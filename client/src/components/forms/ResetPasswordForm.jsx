import React, { useEffect, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "@/components/constants/Icons";
import { Button } from "@/components/ui/button";
import SpinLoader from "@/components/loaders/SpinLoader";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const [formState, setFormState] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [tempEmailAddress, setTempEmailAddress] = useState(null);
  const [inputTypeNewPassword, setInputTypeNewPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputTypeConfirmPassword, setInputTypeConfirmPassword] =
    useState("password");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
    if (formState.newpassword.length !== formState.confirmpassword.length) {
      return toast.error("Both password didn't matched.");
    }
    if (
      formState.newpassword.length < 8 &&
      formState.newpassword.length > 17 &&
      formState.confirmpassword.length < 8 &&
      formState.confirmpassword.length > 17 &&
      formState.confirmpassword != formState.newpassword
    ) {
      return toast.error(
        "Password must be greater than 8 characters and less than 17 characters."
      );
    }
    if (
      formState.newpassword.length >= 8 &&
      formState.newpassword.length <= 17 &&
      formState.confirmpassword.length >= 8 &&
      formState.confirmpassword.length <= 17 &&
      formState.confirmpassword == formState.newpassword
    ) {
      ResetPasswordMutation({
        email: tempEmailAddress,
        password: formState.newpassword,
      });
    }
  };

  const { mutate: ResetPasswordMutation, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const response = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.status == "error") {
          return toast.error(data.message);
        }

        if (data.status == "success") {
          queryClient.invalidateQueries({
            queryKey: ["authorisedCurrentUser"],
          });
          localStorage.removeItem("temp-email");
          navigate("/login");
          toast.success(data.message);
        }
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    setTempEmailAddress(localStorage.getItem("temp-email") || null);
  }, []);

  return (
    <form className="lg:w-[80%] w-[90%]" onSubmit={handleFormSubmit}>
      <label className="mb-1 block mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
          Email Address
        </span>
        <input
          className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 select-none cursor-not-allowed dark:focus:ring-gray-300"
          inputMode="email"
          autoComplete="email"
          type="email"
          name="email"
          value={tempEmailAddress || ""}
          placeholder="eg: your-email-address@email.com"
          disabled={true}
        />
      </label>
      <label className="mb-1 block mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
          New Password
        </span>
        <div className="relative">
          <input
            className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
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
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
          Confirm Password
        </span>
        <div className="relative">
          <input
            className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
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
        className="w-full mt-4 h-9 font-bold bg-[#09090b] dark:bg-white"
        disabled={isPending}
      >
        {isPending ? <SpinLoader /> : "Update password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
