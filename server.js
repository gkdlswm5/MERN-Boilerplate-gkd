const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
const cors = require("cors");

//config.env to ./config/config.env
require("dotenv").config({
  path: "./config/config.env",
});

const app = express();

//app use bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app use bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//config for only development
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  //Morgan gives information about each request
  //Cors allows it to deal with react at port 3000
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//

//use routes
app.use("/api/", routes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
