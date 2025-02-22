import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import catalogController from "./controllers/catalogController.js";
import createController from "./controllers/createController.js";
import searchController from "./controllers/searchController.js";
import errorController from "./controllers/errorController.js";

const routes = Router();

// Definde routes
// Routes
// routes.get('/', (req, res) => {
//     res.send('It works! ve ss')
// })
routes.use(homeController);
routes.use(catalogController);
routes.use(createController);
routes.use(searchController);
routes.use(errorController);
routes.use("/auth", authController);

export default routes;
