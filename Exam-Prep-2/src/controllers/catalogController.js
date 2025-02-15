import { Router } from "express";

const catalogController = Router();

catalogController.get("/catalog", (req, res) => {
  // res.send('It works! ve ss')
  res.render("catalog");
});

export default catalogController;
