const product = require("../models/product.model");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/pharmacy")
  .then(() => {
    console.log("conect");
  })
  .catch((err) => {
    console.log(err);
  });

const products = [
  new product({
    productName: "Paracetamol",
    image: "1.jpeg",
    description: "Paracetamol Dolo 650 - Uses, Side Effects, Composition",
    price: 20,
  }),
  new product({
    productName: "Paracetamol",
    image: "2.jpeg",
    description: "Paracetamol Dolo 650 - Uses, Side Effects, Composition",
    price: 20,
  }),
  new product({
    productName: "Acetylsalicylic acid",
    image: "3.jpg",
    description: "Paracetamol Dolo 650 - Uses, Side Effects, Composition",
    price: 20,
  }),
  new product({
    productName: "Acetaminophen",
    image: "3.jpg",
    description: "Paracetamol Dolo 650 - Uses, Side Effects, Composition",
    price: 20,
  }),
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i]
    .save()
    .then(() => {
      done++;
      if (done === products.length) {
        mongoose.disconnect();
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
