import useSWR from "swr";

type Props = {
  category: string;
  setCategory: any;
  place: string;
};

export const CategoriesList = ({ category, setCategory, place }: Props) => {
  const { data, isLoading, error } = useSWR(`/api/categories/${place}`);

  console.log("categories?", data);

  return (
    <div className="title flex flex-wrap font-semibold text-lg border-b-[3px] justify-center items-center border-neutral-700 md:pb-12 pb-6 md:text-[35px] text-[22px]">
      <div
        className={`  md:(ml-6 mb-4) ml-3 mb-2 ${
          category === "All" ? "text-neutral-800" : "text-neutral-200"
        }`}
        onClick={() => setCategory("All")}
      >
        All
      </div>
      {data &&
        data.map((item: any, idx: number) => {
          return (
            <div
              className={`md:(ml-6 mb-4) ml-3 mb-2 ${
                category === item.categoryKey
                  ? "text-neutral-800"
                  : "text-neutral-200"
              }`}
              key={idx}
              onClick={() => setCategory(item.categoryKey)}
            >
              {item.title}
            </div>
          );
        })}
    </div>
  );
};
