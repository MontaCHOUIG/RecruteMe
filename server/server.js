const express = require("express");

const Sentry = require("@sentry/node");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

require("./config/instrument.js");
const clerkWebhook = require("./Controllers/webhooks.js");
const app = express();

// Middleware

app.use(express.json());

// Connect to database

const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhook.clerkWebhook);
const PORT = process.env.PORT || 3000;

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
