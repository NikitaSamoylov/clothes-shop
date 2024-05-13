import mongoose from "mongoose";

const { Schema } = mongoose;

const favoritesSchema = new Schema(
  {
    userId: String,
    goods: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Favorites || mongoose.model("Favorites", favoritesSchema);