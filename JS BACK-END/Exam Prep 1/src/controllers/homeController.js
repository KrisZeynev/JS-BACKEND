import { Router } from "express";

const homeController = Router();

homeController.get('/', (req, res) => {
    // res.send('It works! ve ss')
    res.render('home')
    // {pageTitle: 'Home'} if it's required on the exam
})


export default homeController;