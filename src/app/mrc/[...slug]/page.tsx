"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR, { mutate, useSWRConfig } from "swr";
import { icons } from "@/intra/globalStyle";
import { useState } from "react";
import useItems from "@/hook/like";
// import useDetailItem from "@/hook/items";
// import useDetailItem from "@/hook/items";

type Props = {
  params: {
    slug: string[];
  };
};

export default function ItmePage({ params }: Props) {
  console.log("item detail page init - params?", params);
  const categoryKey = params.slug[0];
  const itemId = params.slug[1];
  const [popTrait, setPopTrait] = useState(false);
  const [popAbout, setPopAbout] = useState(false);

  // 훅을 잘못만들었을 수도 있고
  // const { addItemLike } = useDetailItem(itemId, placeKey);

  const { setLike } = useItems();

  const {
    data: item,
    isLoading,
    error,
  } = useSWR(`/api/item/${categoryKey}/${itemId}`);
  if (!item) return;
  const {
    title,
    description,
    trait,
    image,
    author,
    likes,
    about,
    place,
    other,
    placeKey,
  } = item;

  const handleLike = () => {
    console.log("click add like");
    if (itemId) {
      setLike(itemId);
    }
  };

  console.log("detail item?", item, "likes?", likes);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex py-4">
        <Link className=" text-[40px]" href={`/${placeKey}`}>
          {"<"}
        </Link>
      </div>
      <div className="flex justify-center h-full">
        <div className="h-[500px] w-[50%] shadow-md rounded-lg flex justify-center items-center">
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
                {!likes ? "0" : likes}
              </div>
            </div>
          </div>
          <div className="text-[#4CEF13] text-[37px] font-semibold ">
            {place}
          </div>
          <div className="flex flex-col border-b-[1px] border-neutral-900">
            <div className="mt-4 text-[36px] font-bold text-shadow">
              {title}
            </div>
            <div className="text-[20px] text-neutral-700 mb-2">{`Found by ${author}`}</div>
          </div>
          <div className="flex flex-col mt-8 border-b-[1px] border-neutral-900 pb-8">
            <div className="text-[36px] font-semibold text-[#4CEF13] ">
              Description
            </div>

            <div className="mt-2 text-neutral-700 text-[24px]">
              {description}
            </div>
          </div>
          {!(place === "soundwolf") && (
            <div
              className="mt-8 border-b-[1px] border-neutral-900 pb-8 "
              onClick={() => setPopTrait(!popTrait)}
            >
              <div className="flex justify-between items-center">
                <div className="text-[#4CEF13] text-[36px] font-semibold">
                  Traits
                </div>
                <p>
                  <icons.ShortArrowDownIcon />
                </p>
              </div>
              {popTrait && <div className="text-[24px]">{trait}</div>}
            </div>
          )}
          <div
            className="mt-8 border-b-[1px] border-neutral-900 pb-8"
            onClick={() => setPopAbout(!popAbout)}
          >
            <div className="flex justify-between items-center">
              <div className="text-[#4CEF13] text-[36px] font-semibold">{`About ${place}`}</div>
              <p>
                <icons.ShortArrowDownIcon />
              </p>
            </div>
            {popAbout && <div className="text-[24px]">{about}</div>}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-16">
        <h1 className="text-2xl font-bold">Related Items</h1>
        <div className="w-full h-full grid grid-cols-6 gap-[12px] mt-8">
          {other &&
            other.map((item: any, idx: number) => {
              return (
                <Link
                  href={`/item/${item.categoryKey}/${item.id}`}
                  className="shadow-md flex justify-center aspect-square items-center"
                  key={idx}
                >
                  <Image
                    src={item.image}
                    width={150}
                    height={150}
                    alt="other items"
                  ></Image>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
