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
    <div className="title flex flex-wrap font-semibold text-lg border-b-[3px] justify-center items-center border-neutral-700 pb-12">
      <div
        className={` text-[35px] font-bold ml-6 mb-4 ${
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
              className={`ml-6 mb-4 text-[35px] font-bold ${
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
