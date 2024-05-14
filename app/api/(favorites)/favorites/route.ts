import Favorites from "@/models/Favorites";
import connect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

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
  const userId = request.nextUrl.searchParams.get("user");

  await connect();

  try {
    await Favorites.findOneAndDelete({ userId });

    return NextResponse.json({ message: "Избранное удалено" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err },
      { status: 500, }
    );
  };
};
