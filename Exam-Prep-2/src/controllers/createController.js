import { Router } from "express";

const createController = Router();

createController.get("/create", (req, res) => {
  // res.send('It works! ve ss')
  res.render("create");
});

export default createController;
