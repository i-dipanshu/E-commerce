import app from "./app.js";
import dotenv from "dotenv";
import connectdb from "./config/db.js";

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to Uncaught Exception.");
  server.close(() => {
    process.exit(1);
  });
});

// config for all the .env variables
dotenv.config({ path: "./config/config.env" });

// conneting to the database
connectdb();

// PORT variable from .env file
const port = process.env.PORT;

// 'server' variable made so that we can use some methods on it
const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection.");

  server.close(() => {
    process.exit(1);
  });
});
