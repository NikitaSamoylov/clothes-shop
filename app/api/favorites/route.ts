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

export const GET = async (request: any) => {
  const userId = request.nextUrl.searchParams.get("user");

  await connect();

  const favoritesList = await Favorites.find({ userId })
    .populate('goods');

  if (!favoritesList) {
    return NextResponse.json(
      { message: "товаров нет" },
      { status: 400 }
    );
  }

  return NextResponse.json({ favoritesList });
};

export const DELETE = async (request: any) => {
  const id = request.nextUrl.searchParams.get("id");

  await connect();

  await Favorites.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Product deleted" },
    { status: 200 }
  );
};
