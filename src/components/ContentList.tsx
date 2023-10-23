"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { CategoriesList } from "./CategoriesList";
import { useState } from "react";
import useItems from "@/hook/item";

type Props = {
  place: string;
};

export default function ContentList({ place }: Props) {
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
  } = useSWR(
    currentFilter === 0
      ? `/api/items/${place}/recent`
      : `/api/items/${place}/popular`
  );

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

  return (
    <div className="md:px-8">
      {!(place === "soundwolf") && (
        <CategoriesList
          category={currentCategory}
          setCategory={setCurrentCategory}
          place={place}
        />
      )}
      <div className="flex justify-end w-full mt-8 relative">
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
        <div className="w-full h-full grid md:grid-cols-3 md:gap-[40px] gap-[16px] md:mt-20 mt-8 grid-cols-1">
          {filteredItems.map((item: any, idx: number) => {
            const { id, title, image, categoryKey } = item;
            return (
              <Link
                href={`/${place}/${categoryKey}/${id}`}
                className="rounded-lg aspect-[4/3] flex justify-center items-center shadow-md"
                key={idx}
              >
                <Image
                  src={image}
                  alt={`image about ${title}`}
                  width={200}
                  height={200}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center w-full h-[400px] items-center text-neutral-300">
          item이 비어 있습니다
        </div>
      )}
    </div>
  );
}
