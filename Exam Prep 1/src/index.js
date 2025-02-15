import express from "express";
import handlebars from "express-handlebars";

import routes from "./routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import { ExpressHandlebars } from 'express-handlebars';

const app = express();

// db setup
try {
  // change techStore with the correct name of the database
  const uri = "mongodb://localhost:27017/techStore";
  await mongoose.connect(uri);
  console.log("DB connected");
} catch (error) {
  console.error("Error cannot connect to DB!");
  console.error(error.message);
}

// Handlebars setup
// 1 to register handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    //   allowProtoMethodsByDefault: true
    },
  })
);

// 2 set to use it
app.set("view engine", "hbs");
app.set("views", "./src/views");

// Express setup -> add static middleware
app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: false })); // qs
app.use(cookieParser());
app.use(routes);

// Start express
app.listen(3000, () =>
  console.log("Server is listening on http://localhost:3000...")
);
