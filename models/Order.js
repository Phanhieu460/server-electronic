const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      images: { type: Array, required: true },
      price: { type: Number, required: true },
      // product: {
      //   type: Schema.Types.ObjectId,
      //   required: true,
      //   ref: "products",
      // },
    },
  ],
  shippingAddress: {
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
});

OrderSchema.set("timestamps", true);

module.exports = mongoose.model("orders", OrderSchema);
