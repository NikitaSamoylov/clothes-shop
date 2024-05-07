import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    userId: String,
    goods: [
      {
        title: String,
        description: String,
        price: Number,
        sizes: [String],
        brand: String,
        count: Number,
        category: String,
        images: [
          {
            link: String,
            name: String
          }
        ],
        inStock: Boolean,
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);