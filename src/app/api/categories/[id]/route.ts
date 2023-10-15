import { getAllCategories } from "@/service/categories";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  const { id } = context.params;
  console.log("api - get - categories - id?", id);

  return getAllCategories(id).then((res) => NextResponse.json(res));
}
