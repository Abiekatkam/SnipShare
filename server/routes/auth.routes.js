import express from "express";
import {
  authLogin,
  authLogout,
  authRegister,
} from "../controllers/auth.controllers.js";

const router = express.Router();

// auth register route
router.post("/register", authRegister);
// auth login route
router.post("/login", authLogin);
// auth logout route
router.post("/logout", authLogout);

export default router;
