process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});

const express = require("express");
const { dbconnection } = require("./src/database/databaseConn");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static("uploads"));
const morgan = require("morgan");
const AppError = require("./src/utils/AppError");
const globalMiddleWareErr = require("./src/utils/globalMiddleWareErr");
const { allRequires } = require("./src/utils");


if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
}

allRequires(app);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this route ${req.originalUrl} on server`, 404));
});
//global error handling middleware
app.use(globalMiddleWareErr);
dbconnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
