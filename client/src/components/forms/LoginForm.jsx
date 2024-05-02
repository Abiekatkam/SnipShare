import React, { useState } from "react";
import { Button } from "../ui/button";
import SpinLoader from "@/components/loaders/SpinLoader";
import { FaRegEyeSlash, FaRegEye } from "@/components/constants/Icons";
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");

  const loader = false;

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <>
      <form className="lg:w-[80%] w-[90%]" onSubmit={handleFormSubmit}>
        <label className="mb-1 block mt-2 w-full">
          <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700">
            Email Address
          </span>
          <input
            className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-400 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900"
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
          <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700">
            Password
          </span>
          <div className="relative">
            <input
              className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-400 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900"
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
          className="w-full mt-4 h-8 lg:h-10 font-bold bg-[#09090b]"
          disabled={loader}
        >
          {loader ? <SpinLoader /> : "Login"}
        </Button>
      </form>

      <div className="lg:w-[80%] w-[90%] mt-3 flex lg:flex-row flex-col items-center justify-between gap-2">
        <ForgotPasswordModal targetEmail={formState.email} />
        <p className="text-xs font-semibold text-slate-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#09090b] hover:underline">
            Register here.
          </Link>{" "}
        </p>
      </div>
    </>
  );
};

export default LoginForm;
