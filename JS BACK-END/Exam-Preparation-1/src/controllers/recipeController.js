import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import recipeServcie from "../services/recipeService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const recipeController = Router();

recipeController.get("/", async (req, res) => {
  // Get all recipes
  const recipes = await recipeServcie.getAll();
  res.render("recipes/catalog", { recipes });
});

recipeController.get("/", async (req, res) => {
  // Get all recipes
  const recipes = await recipeServcie.getAll();
  console.log(recipes)
  res.render("/home", { recipes });
});

recipeController.get("/create", isAuth, (req, res) => {
  res.render("recipes/create");
});

recipeController.post("/create", isAuth, async (req, res) => {
  // Check if logged user
  // Get data from body
  const recipeData = req.body;
  
  const userId = req.user.id;

  try {
    // call recipe service
    await recipeServcie.create(recipeData, userId);
    // Redirect to catalog page
    res.redirect("/recipes");
  } catch (err) {
    // Catch error and return response with kept data and error message

    res.render("recipes/create", {
      error: getErrorMessage(err),
      recipe: recipeData,
    });
  }
});

recipeController.get("/:recipeId/details", async (req, res) => {
  const recipeId = req.params.recipeId;
  const recipe = await recipeServcie.getOne(recipeId);
  const isOwner = recipe.owner.equals(req.user?.id);
  const isPreferred = recipe.recommendList.includes(req.user?.id);
  res.render("recipes/details", { recipe, isOwner, isPreferred });
});

recipeController.get("/:recipeId/prefer", isAuth, async (req, res) => {
  // get recipe id
  const recipeId = req.params.recipeId;
  const userId = req.user.id;

  try {
    // Call service
    await recipeServcie.prefer(recipeId, userId);
  } catch (err) {
    res.setError(getErrorMessage(err));
  }
  // redirect details
  res.redirect(`/recipe/${recipeId}/details`);
});

recipeController.get("/:recipeId/delete", isAuth, async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    await recipeServcie.remove(recipeId, req.user.id);

    res.redirect("/recipes");
  } catch (err) {
    res.setError(getErrorMessage(err));
    res.redirect(`/recipes/${recipeId}/details`);
  }
});

recipeController.get("/:recipeId/edit", isAuth, async (req, res) => {
  // get current divece
  const recipeId = req.params.recipeId;
  const recipe = await recipeServcie.getOne(recipeId);

  // check if owner
  if (!recipe.owner.equals(req.user.id)) {
    res.setError("You are not offer of this offer");
    return res.redirect(`/recipes/${recipeId}/details`);
  }
  // render edit page
  res.render("recipes/edit", { recipe });
});

recipeController.post("/:recipeId/edit", isAuth, async (req, res) => {
  // get current divece
  const recipeId = req.params.recipeId;
  const userId = req.user.id;
  const recipeData = req.body;

  try {
    await recipeServcie.update(recipeId, userId, recipeData);

    res.redirect(`/recipes/${recipeId}/details`);
  } catch (err) {
    res.render("recipes/edit", {
      recipe: recipeData,
      error: getErrorMessage(err),
    });
  }
});

export default recipeController;
