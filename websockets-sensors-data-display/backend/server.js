import express from "express";
import dotenv from "dotenv";
// Note when importing files add ".js"
// import products from "./dataproducts.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running on port 5000"));
