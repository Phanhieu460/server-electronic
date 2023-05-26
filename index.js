require("dotenv").config();
const express = require("express");
const fs = require("fs");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const cors = require("cors");

const connectDB = require("./config/MongoDb");
const authRouter = require("./routes/user");
const productRouter = require("./routes/product");
const blogRouter = require("./routes/blog");
const orderRouter = require("./routes/order");

const Products = require("./models/Product");
const Users = require("./models/User");

const app = express();

connectDB();

const specs = require("./swagger.json");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json()); // doc bat cu du lieu trong body
app.use(cors());

app.use("/api/users", authRouter);
app.use("/api/products", productRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const data = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
const dataProducts = JSON.parse(
  fs.readFileSync("./data/product2.json", "utf-8")
);

const importData = async () => {
  try {
    // await Users.create(data);
    await Products.create(dataProducts);
    console.log("data successfully imported");
    // to exit the proces
    process.exit();
  } catch (error) {
    console.log("error", error);
  }
};

// importData();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
