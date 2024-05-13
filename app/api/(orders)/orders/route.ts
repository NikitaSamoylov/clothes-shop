import Orders from "@/models/Orders";
import connect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const {
    userId,
    userEmail,
    orders,
  } = await request.json();

  await connect();

  const newOrder = new Orders({
    userId,
    userEmail,
    orders,
  });

  try {
    await newOrder.save();
    return NextResponse.json(
      { msg: "Заказ добавлен" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message },
      { status: 500, }
    )
  }
};

export const PUT = async (request: any) => {
  const {
    userId,
    orders,
  } = await request.json();

  await connect();

  const existingOrder = Orders.findOne({ userId });

  if (!existingOrder) {
    return NextResponse.json(
      { message: "Прошлые заказы не найдены" },
      { status: 400 }
    );
  };

  try {
    await Orders.findOneAndUpdate({ userId }, {
      '$push': { orders }
    },
      { new: true }
    );

    return NextResponse.json(
      { msg: "товар обновлен" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ msg: err.message },
      { status: 500, }
    );
  }
};

export const GET = async (request: any) => {
  const userId = request.nextUrl.searchParams.get('user');

  await connect();

  const orders = await Orders.find({ userId })
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

