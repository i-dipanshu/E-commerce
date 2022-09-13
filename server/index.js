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

// config
dotenv.config({ path: "./config/config.env" });
connectdb();

const port = process.env.PORT;

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
