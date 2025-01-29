import "./instrument.js";
import express from "express";

import cors from "cors";
import "dotenv/config";

import sequelize from "./database.js";
import * as Sentry from "@sentry/node";
// init express

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("API working");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// listen to port
const PORT = process.env.PORT || 3000;
// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
