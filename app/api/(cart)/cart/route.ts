import Cart from "@/models/Cart";
import connect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const {
    userId,
    goods,
  } = await request.json();

  await connect();

  const newCart = new Cart({
    userId,
    goods,
  });

  try {
    await newCart.save();
    return NextResponse.json(
      { msg: "продукт добавлен" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message },
      { status: 500, }
    )
  }
};

export const GET = async (request: any) => {
  const id = request.nextUrl.searchParams.get('user');

  await connect();

  const cart = await Cart.find({ userId: id })

  if (!cart) {
    return NextResponse.json(
      { message: "козины нет" },
      { status: 400 }
    );
  }
  return NextResponse.json({ cart });
};

export const PUT = async (request: any) => {
  const {
    userId,
    goods
  } = await request.json();

  await connect();

  const existingCart = await Cart.findOne({ userId });

  if (!existingCart) {
    return NextResponse.json(
      { msg: "ошибка поиска корзины" },
      { status: 400 }
    );
  };

  if (existingCart.goods.includes(goods)) {
    return NextResponse.json(
      { msg: "товар уже добавлен" },
      { status: 400 }
    );
  };

  try {
    await Cart.findOneAndUpdate({ userId }, {
      '$push': { goods }
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

export const DELETE = async (request: any) => {
  const userId = request.nextUrl.searchParams.get('user');

  await connect();

  const existingCart = await Cart.findOne({ userId });

  if (!existingCart) {
    return NextResponse.json(
      { msg: "ошибка поиска корзины" },
      { status: 400 }
    );
  };

  try {
    await Cart.findOneAndDelete({ userId });

    return NextResponse.json(
      { message: "Корзина удалена" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err },
      { status: 500, }
    );
  };
};
