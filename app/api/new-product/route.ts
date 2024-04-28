import Product from "@/models/Product";
import connect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";
import { constants } from "crypto";

export const POST = async (request: any) => {
  const {
    title,
    description,
    price,
    sizes,
    category,
    images,
    inStock,
    brand,
  } = await request.json();

  await connect();

  const existingProduct = await Product.findOne({ title });

  if (existingProduct) {
    return NextResponse.json(
      { message: "такой продукт уже добавлен" },
      { status: 400 }
    );
  }

  const newProduct = new Product({
    title,
    description,
    price,
    sizes,
    category,
    images,
    inStock,
    brand
  });

  try {
    await newProduct.save();
    return NextResponse.json(
      { msg: "продукт добавлен" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message },
      { status: 500, }
    );
  }
};

export const GET = async (request: any) => {
  const page = request.nextUrl.searchParams.get("page");
  const limit = request.nextUrl.searchParams.get("limit");
  const order = request.nextUrl.searchParams.get("sort");

  const priceOrder = order === 1 ? '-' : '';
  console.log(priceOrder);

  await connect();

  const products = await Product
    .find()
    .sort(`${ priceOrder }price`)
    .skip(page)
    .limit(limit)
    .exec()

  console.log(priceOrder)

  if (!products) {
    return NextResponse.json(
      { message: "товаров нет" },
      { status: 400 }
    );
  }
  return NextResponse.json({ products });
};

export const DELETE = async (request: any) => {
  const id = request.nextUrl.searchParams.get("id");
  await connect();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
};

export const PUT = async (request: any) => {
  const {
    _id,
    title,
    description,
    price,
    inStock,
    category
  } = await request.json();

  await connect();

  const existingProduct = await Product.findOne({ _id });

  if (!existingProduct) {
    return NextResponse.json(
      { msg: "товар не найден" },
      { status: 400 }
    );
  };


  try {
    await Product.findOneAndUpdate({ _id }, {
      title, description, price, inStock, category
    }, {
      new: true
    })
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
