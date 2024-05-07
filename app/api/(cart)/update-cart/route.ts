import Cart from "@/models/Cart";
import connect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const PUT = async (request: any) => {
  const {
    userId,
    count,
    productId,
  } = await request.json();

  await connect();

  const existingCart = await Cart.findOne({ userId });

  if (!existingCart) {
    return NextResponse.json(
      { msg: "ошибка поиска корзины" },
      { status: 400 }
    );
  };

  try {
    await Cart.findOneAndUpdate(
      { userId, 'goods._id': productId },
      { '$set': { 'goods.$.count': count } },
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

export const DELETE = async (request: any) => {
  const userId = request.nextUrl.searchParams.get("userId");
  const productId = request.nextUrl.searchParams.get("productId");

  await connect();

  const existingCart = await Cart.findOne({ userId });

  if (!existingCart) {
    return NextResponse.json(
      { msg: "ошибка поиска корзины" },
      { status: 400 }
    );
  };

  try {
    await Cart.findOneAndUpdate({ userId, 'goods._id': productId },
      {
        $pull: { goods: { _id: productId } }
      },
      { new: true });

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err },
      { status: 500, }
    );
  };
};
