import { getAllItems, getItemById } from "@/service/items";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { slug: string[] };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;
  console.log("api items - GET - slug?", slug);

  if (slug.length === 1) {
    return getAllItems(slug[0])
      .then((res) => NextResponse.json(res))
      .catch((err) => console.log(err));
    // 전체 아이템 불러오기
  } else if (slug.length > 1) {
    console.log("api - single item");

    // 개별 아이템 불러옴.
    return getItemById(slug[1], slug[0])
      .then((res) => {
        console.log("api - getItemById - 리스펀스 직전 init");

        return NextResponse.json(res);
      })
      .catch((err) => console.error(err));
  }
}
