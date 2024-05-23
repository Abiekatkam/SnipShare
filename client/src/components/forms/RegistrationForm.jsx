import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { FaRegEyeSlash, FaRegEye } from "@/components/constants/Icons";
import SpinLoader from "@/components/loaders/SpinLoader";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();

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

  const { mutate: RegisterMutation, isPending } = useMutation({
    mutationFn: async ({ email, username, fullname, password }) => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullname, password }),
        });

        const data = await response.json();
        if (data.status == "error") {
          return toast.error(data.message);
        }
        if (data.status == "success") {
          toast.success("Account created successfully");
          navigate("/login");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    RegisterMutation(formState);
  };

  return (
    <form className="lg:w-[80%] w-[90%]" onSubmit={handleFormSubmit}>
      <label className="mb-1 block mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
          Username
        </span>
        <input
          className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
          autoFocus
          inputMode="text"
          autoComplete="username"
          type="text"
          name="username"
          onChange={handleInputStateChange}
          value={formState.username}
          placeholder="eg: jullietmarie09"
          required
        />
      </label>
      <label className="mb-1 block mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
          Full Name
        </span>
        <input
          className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
          inputMode="text"
          type="text"
          autoComplete="fullname"
          name="fullname"
          onChange={handleInputStateChange}
          value={formState.fullname}
          placeholder="eg: Julliet Marie"
          required
        />
      </label>
      <label className="mb-1 block mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
          Email Address
        </span>
        <input
          className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
          inputMode="email"
          autoComplete="email"
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

      <div className="flex items-center space-x-2 mt-4 text-slate-500 dark:text-slate-300">
        <Checkbox id="termsAndCondition" required />
        <Label htmlFor="termsAndCondition" className="text-xs">
          By clicking, you accept our privacy policy.
        </Label>
      </div>

      <Button
        className="w-full mt-4 h-9 font-bold bg-[#09090b] dark:bg-white"
        disabled={isPending}
      >
        {isPending ? <SpinLoader /> : "Register"}
      </Button>
    </form>
  );
};

export default RegistrationForm;
