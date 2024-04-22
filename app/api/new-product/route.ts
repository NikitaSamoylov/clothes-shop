import Product from "@/models/Product";
import connect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const {
    title,
    description,
    price,
    sizes,
    category,
    images,
    inStock,
  } = await request.json();

  await connect();

  const existingProduct = await Product.findOne({ title });
  console.log(existingProduct)

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