import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../config.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
// import { log } from "console";

const authController = Router();

authController.get("/login", (req, res) => {
  res.render("auth/login");
});

authController.get("/register", (req, res) => {
  res.render("auth/register");
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const token = await authService.login(email, password);

  res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

  res.redirect("/");
});

authController.post("/register", async (req, res) => {
  const userData = req.body;
  // console.log(userData)

  try {
    const token = await authService.register(userData);
    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    const error = getErrorMessage(err)
    console.log(error);
  }
});

authController.get("/logout", isAuth, (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.redirect("/");
});

export default authController;