import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaRegUser,
  FaGear,
  MdOutlineMail,
  LuLogOut,
} from "@/components/constants/Icons";
import SidebarLinks from "./SidebarLinks";

const siderbarlinks = [
  {
    id: 1,
    href: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    id: 2,
    href: "/explore",
    name: "Explores",
    icon: <FaSearch />,
  },
  {
    id: 3,
    href: "/notifications",
    name: "Notifications",
    icon: <FaBell />,
  },
  {
    id: 4,
    href: "/messages",
    name: "Messages",
    icon: <MdOutlineMail />,
  },
  {
    id: 5,
    href: "/profile",
    name: "Profile",
    icon: <FaRegUser />,
  },
  {
    id: 6,
    href: "/settings",
    name: "Settings",
    icon: <FaGear />,
  },
];

const Sidebar = () => {
  const pathname = useLocation().pathname;
  return (
    <div className="md:flex-[2_2_0] w-20 max-w-72 border-r border-slate-300 dark:border-slate-500">
      <div className="sticky top-0 left-0 h-screen flex flex-col w-20 md:w-full p-4">
        <Link
          to="/"
          className="lg:text-4xl mt-2 text-lg w-fit font-extrabold text-[#09090b] dark:text-white dancing-script transition-all ease-in duration-200"
        >
          <h1>SnipShare.</h1>
        </Link>

        <div className="mt-5 flex w-full h-fit flex-col items-start">
          {siderbarlinks.map((links) => (
            <SidebarLinks
              key={links.id}
              href={links.href}
              active={pathname == links.href}
              name={links.name}
              Icon={links.icon}
            />
          ))}
        </div>

        <div className="mt-auto w-full flex items-center justify-between gap-3 rounded-xl p-2 px-3 font-semibold text-lg tracking-wide dark:text-white transition-all bg-slate-200 text-[#09090b] ease-in dark:bg-[#27272a]">
          <div className="w-fit flex items-center gap-2">
            <img
              src="https://pbs.twimg.com/profile_images/1564549161974112256/OU_vwEqS_400x400.jpg"
              alt=""
              className="w-10 h-10 rounded-full object-contain"
            />
            <div className="w-fit h-full flex flex-col items-start">
              <h1 className="text-sm">Abhishek Katkam</h1>
              <p className="text-xs text-slate-500">@abhishekkatkam09</p>
            </div>
          </div>
          <LuLogOut
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
