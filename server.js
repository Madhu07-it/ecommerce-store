const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/products", (req, res) => {
  const products = require("./products.json");
  res.json(products);
});

app.listen(3000, () => {
  console.log("Server Running");
});