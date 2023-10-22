"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { CategoriesList } from "./CategoriesList";
import { useState } from "react";

type Props = {
  place: string;
};

export default function AudioList({ place }: Props) {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [filterPopup, setFilterPopup] = useState(false);

  const [currentFilter, setCurrentFilter] = useState(0);

  const filterOps = [
    {
      title: "Recent Items",
    },
    {
      title: "Popular Items",
    },
  ];

  const {
    data: items,
    isLoading,
    error,
  } = useSWR(currentFilter === 0 ? `/api/audio/recent` : `/api/audio/popular`);

  const filteredItems =
    currentCategory === "All"
      ? items
      : items.filter((item: any) => item.categoryKey === currentCategory);

  const filteringRecent = () => {
    setCurrentFilter(0);
    setFilterPopup(false);
  };
  const filteringPopular = () => {
    setCurrentFilter(1);
    setFilterPopup(false);
  };

  const handleFilter = () => {
    if (currentFilter === 1) {
      setCurrentFilter(0);
    } else if (currentFilter === 0) {
      setCurrentFilter(1);
    }
    // if e.target.title === popular ? 어쩌고 저쩌고
    setFilterPopup(false);
  };

  console.log("audio list init - data?", items);

  return (
    <>
      <div className="flex justify-end w-full mt-8 relative md:px-8">
        <div
          className="rounded-3xl border-[0.5px] shadow-sm text-base flex justify-center items-center h-[44px] w-[150px] mb-4"
          onClick={() => setFilterPopup(!filterPopup)}
        >
          {filterOps[currentFilter].title}
        </div>
        {filterPopup && (
          <div className="absolute top-[46px] w-[170px] h-[120px] flex flex-col border-[0.5px] border-neutral-100 bg-white shadow-md rounded-xl justify-center items-center">
            <div
              className={`text-base flex justify-center items-center h-[44px] w-[150px] rounded-3xl border-[0.5px]
              ${currentFilter === 0 ? "bg-neutral-200" : ""}`}
              onClick={filteringRecent}
            >
              {filterOps[0].title}
            </div>
            <div
              className={`text-base flex justify-center items-center h-[44px] w-[150px] rounded-3xl border-[0.5px] mt-2
              ${currentFilter === 1 ? "bg-neutral-200" : ""}`}
              onClick={filteringPopular}
            >
              {filterOps[1].title}
            </div>
          </div>
        )}
      </div>
      {filteredItems && filteredItems[0] ? (
        <div className="w-full grid md:grid-cols-3 md:gap-[70px] gap-[16px] md:pt-20 pt-8 md:px-8 grid-cols-1">
          {filteredItems.map((item: any, idx: number) => {
            const { id, title, placeKey } = item;
            return (
              <Link
                href={`/soundwolf/${id}`}
                className="title rounded-lg aspect-[4/3] flex justify-center items-center shadow-md bg-neutral-50 text-neutral-400"
                key={idx}
              >
                {title}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center w-full h-[400px] items-center text-neutral-300">
          item이 비어 있습니다
        </div>
      )}
    </>
  );
}
