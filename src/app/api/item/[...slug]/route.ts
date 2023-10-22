import { getItemById } from "@/service/items";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { slug: string[] };
};
export async function GET(_: NextRequest, context: Context) {
  console.log("api/item - slug?", context.params.slug);

  const categoryKey = context.params.slug[0];
  const id = context.params.slug[1];
  return getItemById(id, categoryKey)
    .then((res) => NextResponse.json(res))
    .catch((err) => console.log("api/item/id - bad request!"));
}
