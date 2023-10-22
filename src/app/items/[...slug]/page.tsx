"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR, { mutate, useSWRConfig } from "swr";
import { icons } from "@/intra/globalStyle";
// import useDetailItem from "@/hook/items";
// import useDetailItem from "@/hook/items";

type Props = {
  params: {
    slug: string[];
  };
};

export default function ItmeDetailPage({ params }: Props) {
  const placeKey = params.slug[0];
  const itemId = params.slug[1];
  const { mutate } = useSWRConfig();
  console.log("item detail page init - placeKey?", placeKey, "itemId?", itemId);

  // 훅을 잘못만들었을 수도 있고
  // const { addItemLike } = useDetailItem(itemId, placeKey);

  const addLike = async (itemId: string, placeKey: string) => {
    console.log("fetch - addlike init");

    return fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: itemId }),
    }).then(() => mutate(`/api/items/${placeKey}/${itemId}`));
  };

  const { data, isLoading, error } = useSWR(`/api/items/${placeKey}/${itemId}`);

  if (!data) return;
  const { title, description, trait, image, author, likes, about, place } =
    data;

  console.log("item?", data);
  const handleLike = () => {
    console.log("click add like");
    addLike(itemId, placeKey);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex py-4">
        <Link className=" text-[40px]" href={`/${placeKey}`}>
          {"<"}
        </Link>
      </div>
      <div className="flex justify-center h-full">
        <div className="h-[90%] w-[50%] shadow-md rounded-lg flex justify-center items-center">
          <Image
            src={image}
            alt={`image by ${title}`}
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col w-[50%] h-full pl-20 pr-6 py-4">
          <div className="flex w-full justify-end">
            <div className="flex">
              <div onClick={handleLike}>
                <icons.HeartFillIcon />
              </div>
              <div className="ml-2 text-lg font-semibold">
                {likes === null ? "0" : likes}
              </div>
            </div>
          </div>
          <div className="text-[#4CEF13] text-[37px] font-semibold">
            {place}
          </div>
          <div className="mt-4 text-[55px] font-bold border-b-[1px] border-neutral-900 pb-2">
            {title}
          </div>
          <div className="flex flex-col mt-8 border-b-[1px] border-neutral-900 pb-8">
            <div className="text-[36px] font-semibold text-[#4CEF13]">
              Description
            </div>
            <div className="text-[36px] font-semibold mt-2">{`Found by ${author}`}</div>
            <div className="mt-2 text-neutral-700 text-[24px]">
              {description}
            </div>
          </div>
          <div className="mt-8 border-b-[1px] border-neutral-900 pb-8 ">
            <div className="text-[#4CEF13] text-[36px] font-semibold">
              Traits
            </div>
            <div className="text-[24px]">{trait}</div>
          </div>
          <div className="mt-8 border-b-[1px] border-neutral-900 pb-8">
            <div className="text-[#4CEF13] text-[36px] font-semibold">{`About ${place}`}</div>
            <div className="text-[24px]">{about}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
