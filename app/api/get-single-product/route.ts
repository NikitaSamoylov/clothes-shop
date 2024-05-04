import Product from "@/models/Product";
import connect from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (request: any) => {
  const _id = request.nextUrl.searchParams.get("id");
  console.log(`id server: ${ _id }`)
  await connect();

  const product = await Product.findById({ _id });
  return NextResponse.json({ product });
};
