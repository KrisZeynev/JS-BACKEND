import { Router } from "express";

const errorController = Router();

errorController.use((req, res) => {
  res.status(404).render("404");
});

export default errorController;