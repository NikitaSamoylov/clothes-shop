import Orders from "@/models/Orders";
import connect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (request: any) => {

  await connect();

  const orders = await Orders.find()
    .populate({
      path: 'orders',
      populate: {
        path: 'goods',
        model: 'Product'
      }
    })

  if (!orders) {
    return NextResponse.json(
      { message: "заказов нет" },
      { status: 400 }
    );
  }
  return NextResponse.json({ orders });
};

