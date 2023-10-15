import { addLikeRequest } from "@/service/items";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { id: itemId } = await req.json();

  console.log("api - PUT - itemId?", itemId);

  if (!itemId) {
    return new Response("Bad Request", { status: 400 });
  }

  return addLikeRequest(itemId)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
