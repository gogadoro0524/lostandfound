import useSWR from "swr";

type Props = {
  category: string;
  setCategory: any;
  place: string;
};

export const CategoriesList = ({ category, setCategory, place }: Props) => {
  const { data, isLoading, error } = useSWR(`/api/categories/${place}`);

  return (
    <div className="flex flex-wrap font-semibold text-lg border-b-[3px] justify-center items-center border-neutral-700 pb-12">
      <div
        className={` text-[35px] font-bold ml-6 ${
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
                category === item.title
                  ? "text-neutral-800"
                  : "text-neutral-200"
              }`}
              key={idx}
              onClick={() => setCategory(item.title)}
            >
              {item.title}
            </div>
          );
        })}
    </div>
  );
};
