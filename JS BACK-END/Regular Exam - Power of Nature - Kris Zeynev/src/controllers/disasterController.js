import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import disasterService from "../services/disasterService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const disasterController = Router();

disasterController.get("/", async (req, res) => {
  const disasters = await disasterService.getAll();
  res.render("disasters/catalog", { disasters });
});

disasterController.get("/create", isAuth, (req, res) => {
  res.render("disasters/create");
});

disasterController.post("/create", isAuth, async (req, res) => {
  const disasterData = req.body;
  const userId = req.user.id;

  try {
    await disasterService.create(disasterData, userId);

    res.redirect("/disasters");
  } catch (err) {

    res.render("disasters/create", {
      error: getErrorMessage(err),
      disaster: disasterData,
    });
  }
});

disasterController.get("/:disasterId/details", async (req, res) => {
  const disasterId = req.params.disasterId;
  const disaster = await disasterService.getOne(disasterId);
  const isOwner = disaster.owner.equals(req.user?.id);
  const isInterested = disaster.interestedList.includes(req.user?.id);
  res.render("disasters/details", { disaster, isOwner, isInterested });
});

disasterController.get("/:disasterId/interence", isAuth, async (req, res) => {
  const disasterId = req.params.disasterId;
  const userId = req.user.id;

  try {
    await disasterService.interence(disasterId, userId);
  } catch (err) {
    res.setError(getErrorMessage(err));
  }
  res.redirect(`/disasters/${disasterId}/details`);
});

disasterController.get("/:disasterId/delete", isAuth, async (req, res) => {
  const disasterId = req.params.disasterId;

  try {
    await disasterService.remove(disasterId, req.user.id);

    res.redirect("/disasters");
  } catch (err) {
    res.setError(getErrorMessage(err));
    res.redirect(`/disasters/${disasterId}/details`);
  }
});

disasterController.get("/:disasterId/edit", isAuth, async (req, res) => {
  const disasterId = req.params.disasterId;
  const disaster = await disasterService.getOne(disasterId);

  if (!disaster.owner.equals(req.user.id)) {
    res.setError("You are not offer of this offer");
    return res.redirect(`/disasters/${disasterId}/details`);
  }
  res.render("disasters/edit", { disaster });
});

disasterController.post("/:disasterId/edit", isAuth, async (req, res) => {
  const disasterId = req.params.disasterId;
  const userId = req.user.id;
  const disasterData = req.body;

  try {
    await disasterService.update(disasterId, userId, disasterData);

    res.redirect(`/disasters/${disasterId}/details`);
  } catch (err) {
    res.render("disasters/edit", {
      disaster: disasterData,
      error: getErrorMessage(err),
    });
  }
});

export default disasterController;
