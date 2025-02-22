import { Router } from "express";

const searchController = Router();

searchController.get("/search", (req, res) => {
  // res.send('It works! ve ss')
  res.render("search");
});

export default searchController;
