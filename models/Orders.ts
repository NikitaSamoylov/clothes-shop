import mongoose from "mongoose";

const { Schema } = mongoose;

const ordersSchema = new Schema(
  {
    userId: String,
    orders: [
      {
        price: Number,
        date: Number,
        goods: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Product',
          },
        ],
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Orders || mongoose.model("Orders", ordersSchema);