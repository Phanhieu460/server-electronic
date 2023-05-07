require("dotenv").config();
const express = require("express");

const cors = require("cors");

const connectDB = require("./config/MongoDb");
const authRouter = require("./routes/user");
const productRouter = require("./routes/product");
const blogRouter = require("./routes/blog");
const orderRouter = require("./routes/order");

connectDB();

const app = express();
app.use(express.json()); // doc bat cu du lieu trong body
app.use(cors());

app.use("/api/users", authRouter);
app.use("/api/products", productRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
