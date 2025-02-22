import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/authUtils.js";

export const register = async (userData) => {
  if (userData.password !== userData.confirmPassword) {
    throw new Error("Password missmatch!");
  }

  const user = await User.findOne({ email: userData.email }).select({ _id: true }); // 1 or true

  console.log('current email is: ' + userData.email)

  if (user) {
    throw new Error("User already exists!");
  }

  const createduser = await User.create(userData);

  const token = generateToken(createduser);

  return token;
};

//
export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid user or email!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid user or email!");
  }

  const token = generateToken(user);

  return token;
};

const authService = {
  register,
  login,
};
export default authService;
