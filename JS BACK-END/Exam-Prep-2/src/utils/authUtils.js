import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const generateToken = (user) => {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.name,
    };
    const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: "300h" });
    return token;
  };