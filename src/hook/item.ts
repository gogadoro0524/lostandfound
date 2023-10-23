import useSWR from "swr";

async function updateLike(id: string) {
  "update init";
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
}

export default function useItem(url: string) {
  const { data: item, isLoading, error, mutate } = useSWR(url);

  const setLike = (id: string, post: any) => {
    const newItem = {
      ...post,
      likes: post.likes + 1,
    };

    return mutate(updateLike(id), {
      optimisticData: newItem,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };
  return { item, isLoading, error, setLike };
}
