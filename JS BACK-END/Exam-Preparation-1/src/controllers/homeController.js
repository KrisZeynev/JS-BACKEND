import { Router } from "express";
import recipeService from "../services/recipeService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
  //Get last three devices
  // const latestDevices = await recipeService.getLatest();
  // res.render('home', {devices: latestDevices})
  const recipes = await recipeService.getAll()
  res.render("home", {recipes});
});

homeController.get("/about", (req, res) => {
  res.render("about");
});

homeController.get("/profile", isAuth, async (req, res) => {
  const ownDevices = await recipeService.getAll({ owner: req.user.id });
  const preferredRecipes = await recipeService.getAll({
    preferredBy: req.user.id,
  });

  res.render("profile", {
    ownDevices,
    preferredRecipes,
  });
});

export default homeController;
