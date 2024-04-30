import React from "react";
import { Button } from "../ui/button";

const LoginForm = () => {
  return (
    <form className="lg:w-[80%] w-[90%]">
      <label className="mb-1 block lg:mt-4 mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700">
          Email Address
        </span>
        <input
          className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-400 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900"
          inputMode="email"
          autoFocus
          autoComplete="email"
          type="email"
          placeholder="eg: your-email-address@email.com"
          required
        />
      </label>
      <label className="mb-1 block lg:mt-4 mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700">
          Password
        </span>
        <input
          className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-400 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900"
          inputMode="password"
          type="password"
          placeholder="*******"
          required
        />
      </label>

      <Button className="w-full mt-4 h-8 lg:h-10 font-bold bg-[#09090b]">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
