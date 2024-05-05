import express from "express";
import {
  authCurrentUser,
  authForgotPassword,
  authLogin,
  authLogout,
  authRegister,
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

export default router;
