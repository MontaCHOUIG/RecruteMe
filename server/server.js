import express from "express";

import cors from "cors";
import "dotenv/config";

// init express

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("API working");
});

// listen to port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
