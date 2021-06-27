let mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let connection = mongoose.connection;

connection.on("open", () => {
  console.log("connected to the database successfully");
});

connection.on("error", () => {
  console.log("there was some problem in connecting to the database");
});
