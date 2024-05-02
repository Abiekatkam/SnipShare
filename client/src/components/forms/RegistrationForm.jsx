import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const RegistrationForm = () => {
  return (
    <form className="lg:w-[80%] w-[90%]">
      <label className="mb-1 block mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700">
         Username
        </span>
        <input
          className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-400 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900"
          autoFocus
          inputMode="text"
          type="text"
          placeholder="eg: jullietmarie09"
          required
        />
      </label>
      <label className="mb-1 block mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700">
          Full Name
        </span>
        <input
          className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-400 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900"
          inputMode="text"
          type="text"
          placeholder="eg: Julliet Marie"
          required
        />
      </label>
      <label className="mb-1 block mt-2 w-full">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700">
          Email Address
        </span>
        <input
          className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-400 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900"
          inputMode="email"
          autoComplete="email"
          type="email"
          placeholder="eg: your-email-address@email.com"
          required
        />
      </label>
      <label className="mb-1 block mt-2 w-full">
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

      <div className="flex items-center space-x-2 mt-4 text-slate-500">
        <Checkbox id="termsAndCondition" />
        <Label htmlFor="termsAndCondition" className="text-xs">
          By clicking, you accept our privacy policy.
        </Label>
      </div>

      <Button className="w-full mt-4 h-8 lg:h-10 font-bold bg-[#09090b]">
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
