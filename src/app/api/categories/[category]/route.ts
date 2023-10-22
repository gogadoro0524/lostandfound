import { getAllCategories } from "@/service/categories";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { category: string };
};

export async function GET(_: NextRequest, context: Context) {
  const { category } = context.params;
  console.log("api/categories init");

  return getAllCategories(category).then((res) => NextResponse.json(res));
}
