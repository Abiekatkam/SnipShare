import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SpinLoader from "@/components/loaders/SpinLoader";
import { FaRegEyeSlash, FaRegEye } from "@/components/constants/Icons";
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");

  const handleInputStateChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(true);
    setInputType("text");
    setTimeout(() => {
      setShowPassword(false);
      setInputType("password");
    }, 2000);
  };

  const queryClient = useQueryClient();

  const { mutate: LoginMutation, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const response = await fetch("/api/auth/login", {
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
          toast.success(data.message);
        }
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    LoginMutation(formState);
  };

  return (
    <>
      <form className="lg:w-[80%] w-[90%]" onSubmit={handleFormSubmit}>
        <label className="mb-1 block mt-2 w-full">
          <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
            Email Address
          </span>
          <input
            className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
            inputMode="email"
            autoComplete="email"
            autoFocus
            type="email"
            name="email"
            onChange={handleInputStateChange}
            value={formState.email}
            placeholder="eg: your-email-address@email.com"
            required
          />
        </label>
        <label className="mb-1 block mt-2 w-full">
          <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
            Password
          </span>
          <div className="relative">
            <input
              className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              inputMode="password"
              type={inputType}
              name="password"
              autoComplete="current-password"
              onChange={handleInputStateChange}
              value={formState.password}
              placeholder="********"
              required
            />
            <button
              type="button"
              className={`absolute inset-y-0 right-0 items-center text-slate-500 px-2 ${
                formState.password.length > 1 ? "flex" : "hidden"
              }`}
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </label>
        <Button
          className="w-full mt-4 h-9 font-bold bg-[#09090b] dark:bg-white"
          disabled={isPending}
        >
          {isPending ? <SpinLoader /> : "Login"}
        </Button>
      </form>

      <div className="lg:w-[80%] w-[90%] mt-3 flex lg:flex-row flex-col items-center justify-between gap-2">
        <ForgotPasswordModal targetEmail={formState.email} />
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#09090b] hover:underline dark:text-slate-300"
          >
            Register here.
          </Link>{" "}
        </p>
      </div>
    </>
  );
};

export default LoginForm;
