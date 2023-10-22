"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR, { mutate, useSWRConfig } from "swr";
import { icons } from "@/intra/globalStyle";
import { useRef, useState } from "react";
// import useDetailItem from "@/hook/items";
// import useDetailItem from "@/hook/items";

type Props = {
  params: {
    id: string;
  };
};

export default function ItmePage({ params }: Props) {
  console.log("item detail page init - params?", params);
  const itemId = params.id;
  const { mutate } = useSWRConfig();
  const [popTrait, setPopTrait] = useState(false);
  const [popAbout, setPopAbout] = useState(false);

  const [playing, setPlaying] = useState<boolean>(false);
  const audioRef = useRef<any>(null);

  const togglePlay = () => {
    if (playing) {
      audioRef && audioRef.current.pause();
    } else {
      audioRef && audioRef.current.play();
    }
    setPlaying(!playing);
  };
  // 훅을 잘못만들었을 수도 있고
  // const { addItemLike } = useDetailItem(itemId, placeKey);

  const addLike = async (itemId: string) => {
    console.log("fetch - addlike init");

    return fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: itemId }),
    }).then(() => mutate(`/api/item/${itemId}`));
  };

  const { data: item, isLoading, error } = useSWR(`/api/audio/item/${itemId}`);
  if (!item) return;
  const { title, description, author, likes, about, placeKey, audio } = item;

  const handleLike = () => {
    console.log("click add like");
    ``;
    addLike(itemId);
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
        <div className="h-[500px] w-[50%] shadow-md rounded-lg  justify-between items-center flex flex-col">
          <div></div>
          <button onClick={togglePlay}>
            {playing ? (
              <icons.StopIcon className=" aspect-square text-neutral-600" />
            ) : (
              <icons.PlayIcon className="aspect-square text-neutral-600" />
            )}
          </button>
          <audio
            ref={audioRef}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            controls
            className="w-full py-2 px-4"
          >
            <source src={audio.asset.url} type="audio/mpeg" />
            지원되지 않는 인터넷 입니다. 크롬 또는 사파리로 이용해주세요.
          </audio>
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
            {placeKey}
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
          <div
            className="mt-8 border-b-[1px] border-neutral-900 pb-8"
            onClick={() => setPopAbout(!popAbout)}
          >
            <div className="flex justify-between items-center">
              <div className="text-[#4CEF13] text-[36px] font-semibold">{`About ${placeKey}`}</div>
              <p>
                <icons.ShortArrowDownIcon />
              </p>
            </div>
            {popAbout && <div className="text-[24px]">{about}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
