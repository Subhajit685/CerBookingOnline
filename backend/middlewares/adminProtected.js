import jwt from "jsonwebtoken";
import Captain from "../models/captain.js";
import User from "../models/user.js";

const adminProtected = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Check if token is present
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token is required." });
    }

    // Verify the token
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }

    // Check if the user is a captain
    const captain = await Captain.findById(decode.id);
    if (captain) {
      if (!captain.admin) {
        return res
          .status(403)
          .json({ success: false, message: "Access denied. Admin privileges required." });
      }
      return next();
    }

    // Check if the user is a regular user
    const user = await User.findById(decode.id);
    if (user) {
      if (!user.admin) {
        return res
          .status(403)
          .json({ success: false, message: "Access denied. Admin privileges required." });
      }
      return next();
    }

    // If neither Captain nor User is found
    return res.status(404).json({ success: false, message: "User not found." });
  } catch (error) {
    console.error("Error in adminProtected middleware:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export default adminProtected;
