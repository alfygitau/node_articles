const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const errorHandler = require("./middleware/errorHandler");
const { logEvents, logger } = require("./middleware/logger");
const articleRoute = require("./routes/articles");
const notFound = require("./controllers/notFound");

dotenv.config();
const app = express();
const port = process.env.PORT || 3500;

// connection to the database
connectDB();

// middleware to log requests
app.use(logger);

// middleware to access form data
app.use(express.json());

// routes
app.use("/api/v1/articles", articleRoute);

// not found route
app.use(notFound);

// middleware to log error
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log(`MONGO_DB connection successful`);
  app.listen(port, console.log(`Server connected on port ${port}`));
});

mongoose.connection.on("error", (error) => {
  console.log(error);
  logEvents(
    `${error.no}:${error.code}\t${error.syscall}\t${error.hostname}`,
    "mongoErrLog.log"
  );
});
