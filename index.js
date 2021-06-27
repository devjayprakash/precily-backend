//this is for the enviroment valiables
require("dotenv").config();

//all out imports
let express = require("express");
let helmet = require("helmet");
let morgan = require("morgan");
let cors = require("cors");

//all our routes
let routes = require("./routes");

//for database setup and connection
require("./db");

//the app will run on port 8080 if no other port is mentioned in .env file
let PORT = process.env.PORT || 8080;
let isDev = process.env.NODE_ENV !== "production";

//our express app
let app = express();

//all the middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);

//our 404 route handler
app.all("*", (req, res) => {
  res.status(404).send({
    result: false,
    msg: "The route you are trying to search does not exists",
  });
});

//error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    msg: "There was some internal server error. Please try again after sometime",
    error: isDev
      ? err.stack
      : "Please contact the developer for more information",
  });
});

//starting out server
app.listen(PORT, () => {
  console.log("Server started on port ");
});
