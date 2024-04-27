import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      minLength: [2, "имя от 2 символов"],
      required: [true, "введите название"],
      trim: true,
    },
    description: {
      type: String,
      minLength: [2, "от 2 символов"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "введите цену"],
      min: [1, "не меньше 1"],
    },
    sizes: [
      {
        type: String,
        required: [true, "выберите размеры"],
      }
    ],
    brand: {
      type: String
    },
    category: {
      type: String,
      required: [true, "выберите категорию"],
      trim: true,
    },
    images: [
      {
        link: String,
        name: String
      }
    ],
    inStock: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);