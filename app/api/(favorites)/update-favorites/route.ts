import Favorites from "@/models/Favorites";
import connect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const {
    userId,
    goods,
  } = await request.json();

  await connect();

  const newFavorites = new Favorites({
    userId,
    goods,
  });

  try {
    await newFavorites.save();
    return NextResponse.json(
      { msg: "товар добавлен" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message },
      { status: 500, }
    );
  }
};

export const PUT = async (request: any) => {
  const {
    userId,
    goods,
  } = await request.json();

  await connect();

  const existingFavorites = Favorites.find({ userId });

  if (!existingFavorites) {
    return NextResponse.json(
      { message: "Товары в избранном не найдены" },
      { status: 400 }
    );
  };

  try {
    await Favorites.findOneAndUpdate({ userId }, {
      '$push': { goods }
    },
      { new: true }
    );

    return NextResponse.json(
      { msg: "Избранное обновлено" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ msg: err.message },
      { status: 500, }
    );
  }
};

export const DELETE = async (request: any) => {
  const id = request.nextUrl.searchParams.get("id");
  const userId = request.nextUrl.searchParams.get("user");

  await connect();

  const existingFavorites = await Favorites.findOne({ userId });

  if (!existingFavorites) {
    return NextResponse.json(
      { msg: "ошибка поиска избранное" },
      { status: 400 }
    );
  };

  try {
    await Favorites.findOneAndUpdate({ userId, 'goods': id },
      {
        $pull: { goods: id }
      },
      { new: true });

    return NextResponse.json({ message: "Продукт удален" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err },
      { status: 500, }
    );
  };
};
