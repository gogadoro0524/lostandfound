"use client";

import Link from "next/link";
import useSWR, { mutate, useSWRConfig } from "swr";
import { icons } from "@/intra/globalStyle";
import { useEffect, useRef, useState } from "react";
import useItem from "@/hook/item";
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
  const [popAbout, setPopAbout] = useState(false);
  const [clientLikes, setClientLikes] = useState(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const audioRef = useRef<any>(null);
  const { item, isLoading, error, setLike } = useItem(
    `/api/audio/item/${itemId}`
  );
  useEffect(() => {
    console.log("item page useEffect init");
    window.scrollTo(0, 0);
    if (item) {
      setClientLikes(item.likes);
    }
  }, [item]);

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

  console.log("hi");
  console.log("detail item?", item);
  if (!item) return;
  const { title, description, author, likes, about, placeKey, audio } = item;

  const handleLike = () => {
    console.log("click add like");
    if (itemId) {
      setLike(itemId, item);
      setClientLikes((prev) => prev + 1);
      console.log("current likes?", clientLikes);
    }
  };

  return (
    <div className="flex flex-col w-screen px-4">
      <div className="flex py-4">
        <Link className=" text-[40px]" href={`/${placeKey}`}>
          {"<"}
        </Link>
      </div>
      <div className="md:flex justify-center h-full">
        <div className="md:h-[500px] aspect-square md:w-[50%] shadow-md rounded-lg  justify-between items-center flex flex-col relative">
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
          {likes >= 50 && (
            <div className="absolute w-full title md:h-[500px] md:w-[50%] aspect-square bg-neutral-300 opacity-80 flex justify-center items-center md:text-[50px] text-neutral-700">
              SOLD OUT
            </div>
          )}
        </div>
        <div className="flex flex-col md:w-[50%] h-full md:pl-20 pr-6 py-4">
          <div className="flex w-full justify-end">
            {likes < 50 && (
              <div className="flex">
                <div onClick={handleLike}>
                  <icons.HeartFillIcon />
                </div>
                <div className="ml-2 text-lg font-semibold text-neutral-400">
                  {!likes ? "0" : clientLikes >= 50 ? "SOLD OUT" : likes}
                </div>
              </div>
            )}
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
