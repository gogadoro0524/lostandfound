import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";

// export default function useDetailItem(itemId: string, place: string) {
// const {
//   data: item,
//   isLoading,
//   error,
//   mutate,
// } = useSWR(`/api/items/${place}/${itemId}`);

//   const addItemLike = (itemId: string, placeKey: string) => {
//     console.log("hook - add item like");
//     return addLike(itemId, placeKey);
//   };

//   return { addItemLike };
// }
