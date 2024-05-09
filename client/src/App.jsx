import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  ErrorPage,
  ExplorePage,
  LoginPage,
  MessagePage,
  NotificationPage,
  ProfileDetailPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  RootPage,
  SettingPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/sidebar/Sidebar";
import { useQuery } from "@tanstack/react-query";
import SpinTextLoader from "./components/loaders/SpinTextLoader";

const isRouteInList = (currentPath) => {
  const routeList = [
    "/",
    "/explore",
    "/notifications",
    "/messages",
    "/settings",
    "/profile",
  ];

  // Check if the current path matches any of the static routes
  if (routeList.includes(currentPath)) {
    return true;
  }

  // Check if the current path matches any parent routes with dynamic parameters
  return routeList.some((route) => {
    // Replace dynamic parameters in the route with a regular expression pattern
    const regexRoute = route.replace(/:[^/]+/g, "\\w+");
    const regex = new RegExp(`^${regexRoute}(\/\\w+)*$`);
    return regex.test(currentPath);
  });
};

const App = () => {
  const location = useLocation().pathname;
  const isValidRoute = isRouteInList(location);

  const { data: authorisedCurrentUser, isLoading } = useQuery({
    queryKey: ["authorisedCurrentUser"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/auth/current-user");
        const responseData = await response.json();
        console.log(responseData);
        if (responseData?.status == "error") {
          return null;
        }
        if (!response.ok) {
          throw new Error(responseData.message || "Something went wrong!");
        }
        if (responseData.status == "success") {
          return responseData?.data;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center dark:bg-[#09090b] bg-white">
        <SpinTextLoader />
      </div>
    );
  }

  return (
    <main className="dark:bg-[#09090b] selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="flex max-w-[1340px] mx-auto">
        {authorisedCurrentUser && isValidRoute && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={
              authorisedCurrentUser ? <RootPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/explore"
            element={
              authorisedCurrentUser ? <ExplorePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/notifications"
            element={
              authorisedCurrentUser ? (
                <NotificationPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/messages"
            element={
              authorisedCurrentUser ? <MessagePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/settings"
            element={
              authorisedCurrentUser ? <SettingPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={
              authorisedCurrentUser ? <ProfilePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile/:username"
            element={
              authorisedCurrentUser ? (
                <ProfileDetailPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !authorisedCurrentUser ? <LoginPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/register"
            element={
              !authorisedCurrentUser ? <RegisterPage /> : <Navigate to="/" />
            }
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </main>
  );
};

export default App;
