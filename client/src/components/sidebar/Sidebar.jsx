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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
    href: "/profile",
    name: "Profile",
    icon: <FaRegUser />,
  },
  {
    id: 5,
    href: "/settings",
    name: "Settings",
    icon: <FaGear />,
  },
];

const Sidebar = () => {
  const pathname = useLocation().pathname;
  const queryClient = useQueryClient();

  const { mutate: LogoutMutation } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.status == "error") {
          toast.error(data.message);
        }
        if (data.status == "success") {
          queryClient.invalidateQueries({
            queryKey: ["authorisedCurrentUser"],
          });
          toast.success(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

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
          <Link to={`/profile`} className="w-fit flex items-center gap-2">
            <img
              src={authenticatedUser.profileImage || "/avatar-placeholder.png"}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="w-fit h-full flex flex-col items-start">
              <h1 className="text-sm capitalize">
                {authenticatedUser.fullname}
              </h1>
              <p className="text-xs text-slate-500">
                @{authenticatedUser.username}
              </p>
            </div>
          </Link>
          <LuLogOut
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              LogoutMutation();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
