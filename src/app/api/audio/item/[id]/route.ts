import { getAuidoById } from "@/service/audio";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};
export async function GET(_: NextRequest, context: Context) {
  console.log("api/audio/item/id - context?", context);

  const id = context.params.id;

  return getAuidoById(id)
    .then((res) => NextResponse.json(res))
    .catch((err) => console.log(err));
}
