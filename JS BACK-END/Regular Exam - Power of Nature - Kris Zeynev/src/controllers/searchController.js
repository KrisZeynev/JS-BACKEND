import { Router } from "express";
import searchService from "../services/searchService.js";
import disasterService from "../services/disasterService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const searchController = Router();

searchController.get("/", async (req, res) => {
  const disasters = await disasterService.getAll();
  res.render("search", { disasters });
});

searchController.post("/", async (req, res) => {
  const data = req.body;
  try {
    const disasters = await searchService.getDisastersOnSearch(data.name, data.type);
    res.render("search", { 
        disasters,
        data,
    });
  } catch (error) {
    res.render("search", {
      error: getErrorMessage(error),
      data,
    });
  }
});

export default searchController;