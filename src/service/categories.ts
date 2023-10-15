import { client } from "./sanity";

export const getAllCategories = async (id: string) => {
  return client.fetch(
    `*[!(_id in path('drafts.**'))][_type == "categories" && place._ref in *[_type == "place" && key=="${id}"]._id]{title}`
  );
};
