const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const http = require("http");
const jsondata = require("./sampledata/products.json");

const app = express();
const httpServer = http.Server(app);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const port = process.env.PORT || 8081;

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Happy coding");
});

//to get all product details
app.get("/products", (req, res) => {
  res.send(jsondata);
});

//to get a particular product
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const productDetail = jsondata.find((product) => product._id == id);
  if (productDetail) res.send(productDetail);
  else {
    res.send({ message: "product not found" });
  }
});

httpServer.listen(port, () => {
  console.log("server started at port:" + port);
});
