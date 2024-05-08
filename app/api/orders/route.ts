import Orders from "@/models/Orders";
import connect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const {
    userId,
    orders,
  } = await request.json();

  await connect();

  const newOrder = new Orders({
    userId,
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

export const GET = async (request: any) => {
  const userId = request.nextUrl.searchParams.get('user');

  await connect();

  // const cart = await Orders.find({ userId: id }).populate('orders.goods')
  const cart = await Orders.findOne({ userId })
    .populate({
      path: 'orders',
      populate: {
        path: 'goods',
        model: 'Product'
      }
    })

  if (!cart) {
    return NextResponse.json(
      { message: "козины нет" },
      { status: 400 }
    );
  }
  return NextResponse.json({ cart });
};

// export const PUT = async (request: any) => {
//   const {
//     userId,
//     goods
//   } = await request.json();

//   await connect();

//   const existingCart = await Cart.findOne({ userId });

//   if (!existingCart) {
//     return NextResponse.json(
//       { msg: "ошибка поиска корзины" },
//       { status: 400 }
//     );
//   };

//   if (existingCart.goods.includes(goods)) {
//     return NextResponse.json(
//       { msg: "товар уже добавлен" },
//       { status: 400 }
//     );
//   };

//   try {
//     await Cart.findOneAndUpdate({ userId }, {
//       '$push': { goods }
//     },
//       { new: true }
//     );

//     return NextResponse.json(
//       { msg: "товар обновлен" },
//       { status: 200 }
//     );
//   } catch (err: any) {
//     return NextResponse.json({ msg: err.message },
//       { status: 500, }
//     );
//   }
// };
