import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  ErrorPage,
  ExplorePage,
  LoginPage,
  MessagePage,
  NotificationPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  RootPage,
  SettingPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/sidebar/Sidebar";

const isRouteInList = (currentPath) => {
  const routeList = [
    "/",
    "/explore",
    "/notifications",
    "/messages",
    "/settings",
    "/profile",
    "/login",
    "/register",
  ];

  return routeList.some((route) => {
    if (route.includes(":")) {
      const regex = new RegExp(`^${route.replace(/:\w+/g, "\\w+")}$`);
      return regex.test(currentPath);
    }
    return route === currentPath;
  });
};

const App = () => {
  const location = useLocation().pathname;
  const authUser = true;
  const isValidRoute = isRouteInList(location);

  return (
    <main className="dark:bg-[#09090b]">
      <div className="flex max-w-[1340px] mx-auto">
        {authUser && isValidRoute && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={authUser ? <RootPage /> : <Navigate to="/register" />}
          />
          <Route
            path="/explore"
            element={authUser ? <ExplorePage /> : <Navigate to="/register" />}
          />
          <Route
            path="/notifications"
            element={
              authUser ? <NotificationPage /> : <Navigate to="/register" />
            }
          />
          <Route
            path="/messages"
            element={authUser ? <MessagePage /> : <Navigate to="/register" />}
          />
          <Route
            path="/settings"
            element={authUser ? <SettingPage /> : <Navigate to="/register" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/register" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!authUser ? <RegisterPage /> : <Navigate to="/" />}
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
