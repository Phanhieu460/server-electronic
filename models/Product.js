const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
  },
  sku: {
    type: String,
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  news: {
    type: Boolean,
    default: false,
    enum: [true, false],
  },
  tag: {
    type: Array,
  },
  category: {
    type: Array,
  },
  variation: [
    {
      color: {
        type: String,
      },
      image: {
        type: String,
      },
      size: [
        {
          name: {
            type: String,
          },
          stock: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  ],
  images: {
    type: Array,
  },
  shortDescription: {
    type: String,
  },
  fullDescription: {
    type: String,
  },
});

ProductSchema.set("timestamps", true);

module.exports = mongoose.model("products", ProductSchema);
