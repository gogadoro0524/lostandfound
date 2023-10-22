import { getAllPopularItems, getAllRecentItems } from "@/service/items";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { slug: string[] };
};
export async function GET(_: NextRequest, context: Context) {
  console.log("api/items/mrc init - context?", context);

  const place = context.params.slug[0];
  const filter = context.params.slug[1];

  if (filter === "recent") {
    return getAllRecentItems(place).then((res) => NextResponse.json(res));
  }
  if (filter === "popular") {
    return getAllPopularItems(place).then((res) => NextResponse.json(res));
  } else {
    throw Error("bad request");
  }
}
