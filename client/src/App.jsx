import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage, ResetPasswordPage, RootPage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/sidebar/Sidebar";

const App = () => {
  const authUser = true;
  return (
    <>
      <div className="flex max-w-[1340px] mx-auto">
        {authUser && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={authUser ? <RootPage /> : <Navigate to="/register" />}
          />
          <Route
            path="/explore"
            element={authUser ? <RootPage /> : <Navigate to="/register" />}
          />
          <Route
            path="/notifications"
            element={authUser ? <RootPage /> : <Navigate to="/register" />}
          />
          <Route
            path="/message"
            element={authUser ? <RootPage /> : <Navigate to="/register" />}
          />
          <Route
            path="/setting"
            element={authUser ? <RootPage /> : <Navigate to="/register" />}
          />
          <Route
            path="/profile"
            element={authUser ? <RootPage /> : <Navigate to="/register" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!authUser ? <RegisterPage /> : <Navigate to="/" />}
          />
          <Route
            path="/reset-password"
            element={!authUser ? <ResetPasswordPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
