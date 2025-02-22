import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import deviceController from "./controllers/DeviceController.js";

const routes = Router();

// Definde routes
// Routes
// routes.get('/', (req, res) => {
//     res.send('It works! ve ss')
// })
routes.use(homeController)
routes.use('/auth', authController)
routes.use('/devices', deviceController)

export default routes;