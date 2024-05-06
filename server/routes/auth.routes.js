import express from "express";
import {
  authChangePassword,
  authChangePrivacy,
  authCurrentUser,
  authForgotPassword,
  authLogin,
  authLogout,
  authRegister,
  authResetPassword,
} from "../controllers/auth.controllers.js";
import { restrictedRoute } from "../utility/middleware/restrictedRoute.js";

const router = express.Router();

// auth register route
router.post("/register", authRegister);
// auth login route
router.post("/login", authLogin);
// auth logout route
router.post("/logout", authLogout);
// auth current user route
router.get("/current-user", restrictedRoute, authCurrentUser);
// auth forgot password route
router.post("/forgot-password", authForgotPassword);
// auth reset password route
router.post("/reset-password", authResetPassword);
// auth change password route
router.post("/change-password", authChangePassword);
// auth change password route
router.post("/change-privacy", authChangePrivacy);

export default router;
