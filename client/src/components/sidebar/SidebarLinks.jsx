import React from "react";
import { Link } from "react-router-dom";

const SidebarLinks = ({ href, active, name, Icon }) => {
  return (
    <Link
      to={href}
      className={`mb-1.5 mt-1.5 w-full flex items-center justify-start gap-3 rounded-xl p-2 px-3 font-semibold text-lg tracking-wide  dark:text-white transition-all ease-in dark:hover:bg-[#27272a] hover:bg-slate-100 ${
        active
          ? "dark:bg-[#27272a] bg-slate-100 text-[#09090b]"
          : "text-slate-500"
      }`}
    >
      {Icon} <span>{name}</span>
    </Link>
  );
};

export default SidebarLinks;
