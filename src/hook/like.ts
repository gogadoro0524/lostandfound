import useSWR, { mutate } from "swr";

export default function useItems(url?: string) {
  const { data: items, isLoading, error } = useSWR(url);

  const setLike = (id: string) => {
    console.log("hook - setLike init");

    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: id }),
    }).then(() => mutate(`/api/items/mrc`));
  };
  return { items, isLoading, error, setLike };
}
