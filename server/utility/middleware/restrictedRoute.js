import User from "../../models/user.models.js";
import jwt from "jsonwebtoken";

export const restrictedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Invalid token.",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(
      `Restricted route error : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
