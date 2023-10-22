import { getPopularAllAudio, getRecentAllAudio } from "@/service/auido";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { opt: string };
};

export async function GET(_: NextRequest, context: Context) {
  console.log("api/auido/opt init - context?", context);

  const option = context.params.opt;
  if (option === "recent") {
    return getRecentAllAudio()
      .then((res) => NextResponse.json(res))
      .catch((err) => console.log("api/audio/opt err"));
  } else if (option === "popular") {
    return getPopularAllAudio()
      .then((res) => NextResponse.json(res))
      .catch((err) => console.log("api/audio/opt err"));
  } else {
    throw Error("bad reqeust");
  }
}
