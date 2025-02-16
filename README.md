<!-- JS-BACKEND CHEATSHEET-->

1. Initialize project
- [x]  command => npm init --yes
- [x]  add module system if no exist and change it into module => type: module
- [x]  nodemon setup => npm i -D nodemon and add to scripts => "dev": "nodemon src/index.js"

- [x] create src folder

- [x] setup debbuging => run and debug create a launch.json file
- [x] in configurations add nodemon to create nodemon setup and delete the default one

2. Express
- [x] Instal express `npm i express`
- [x] setup initial http server
- [x] Add public resources - img, css and etc
 - create public folder into src and add the styles !!!
- [x] Add static middleware
- [x] Add body parser
- [x] Add routes modular router
 - create routes.js into src
- [x] Add home controller

3. Handlebars
- [x] Instal handlebars `npm i express-handlebars`
- [x] Config handlebars as view engine (work with express)
- [x] Enable mongo documents to be passed to the view
 - [x] go to index.js
- [x] Change view directory
 - create views folder into the src
- [x] Add resources to views folder - .html files like 404, register, login, home
 - create controllers folder into src
 - create homeController.js into the controllers folder
- [x] Add home view
- [x] Add layout
 - create a new folder layouts into the view folder
 - then create main.hbs file into the layouts folder (all the common code)
- [x] add partials directory
 - creating partials folder into the views folder

4. Database
- [x] Install mongoose `npm i mongoose`
- [x] Setup db connection into index.js
- [x] Add user model
 - create folder models into src
 - create User.js into the models folder

5. Register
- [x] Fix navigation links
- [x] Add register view
 - create auth folder into the views folder
- [x] Add auth controller
 - create authController.js into the controllers folder
 - register authController into the routes file
- [x] Change the paths from relative to absolute - remove the .
- [x] Add register page
- [x] Fix register form
 - go to register.hbs
 - remove the action from the form
 - add names (name = "username", "email", "password", "confirmPassword")
- [x] Add post register action
 - go to auth Controller
 - create new folder services into the into the src folder
 - create authService.js
- [x] Add authService with register
- [x] Install bcrypt `inp i bcrypt`
- [x] Hash the passowrd
- [x] Check confirmPassword (this could be rePass, repeatPassword or sth else)
- [x] Check if user exists

6. Login
- [x] Add jsonwebtoken `npm i jsonwebtoken`
- [x] Add cookie-parser middleware (into index.js)
- [x] Add login view
 - [x] move login.html to auth folder and remove it to login.hbs
 - [x] add it to the auth controller
- [x] Add get login action
- [x] Fix login form
 - [x] remove the action from the form
 - [x] add the corresponding `name` - username and password
- [x] Add post login action
 - go to auth controller and create .post()
- [x] Add login to authService
- [x] Validate user
- [x] Validate password
- [x] Generate token
 - [x] create config.js file into the src folder to save the secret
- [x] Return token as cookie
 - [x] go to auth controller
- [x] Autologin on register
 - [x] export generation of token into external function - create utils folder and inside authUtils.js

7. Logout
- [x] Add logout action
 - [x] go to authController

8. Authentication
- [x] Add cookie parser `npm i cookoe-parser`
- [x] Add auth middleware
 - [x] create new folder middlewares into the src folder
 - [x] create authMiddleware.js into the middlewares folder
- [x] Check if quest
- [x] Token verification
- [x] Attach user to request
- [x] Attach user to handlebars context

9. Authorization
- [x] Add isAuth middleware
- [x] Add route guards authorization
 - [x] go to routes

10. Error handling
- [x] Add notifications
 - [x] go to main.hbs
- [x] Extract error message
 - create file errorUtils.js into utils folder
- [x] Add error handling for register
- [x] Add error handling for login

11. Bonus
- [x] Dyncamic Navigation
- [x] Async jsonwebtoken