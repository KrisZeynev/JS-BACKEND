import { Router } from "express";

const homeController = Router();

homeController.get("/", (req, res) => {
  // res.send('It works! ve ss')
  res.render("home");
});

export default homeController;
