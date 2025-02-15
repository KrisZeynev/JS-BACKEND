import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";

const routes = Router();

// Definde routes
// Routes
// routes.get('/', (req, res) => {
//     res.send('It works! ve ss')
// })
routes.use(homeController)
routes.use('/auth', authController)

export default routes;