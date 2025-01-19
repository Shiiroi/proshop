import express from "express";
import products from "./data/products.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.get("/", (req, res) => {
  res.send("API running...");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.send(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});