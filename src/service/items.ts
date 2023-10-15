import { client, urlFor } from "./sanity";

const simpleContentProjection = `
"id" : _id,
"image" : photo,
title,
likes,
"category" : category->title,
"createdAt": _createdAt,
"author": category->author,
"description": category->description,
"trait": category->trait,
"about": place->about,
"place": place->title,
"other": *[_type == "category" ] 
`;

export const getAllItems = async (place: string) => {
  return client
    .fetch(
      `*[!(_id in path('drafts.**'))][_type == "items" && place._ref in *[_type == "place" && key == "${place}"]._id]{
        likes,
        "id" : _id,
        "image" : photo,
        title,
        "createdAt": _createdAt,
        "category" : category->title
      }|order(createdAt desc)`
    )
    .then((data) =>
      data.map((item: any) => {
        if (!item.image) {
          return item;
        } else {
          return { ...item, image: urlFor(item.image) };
        }
      })
    );
};

export const getItemById = async (itemId: string, placeKey: string) => {
  console.log("req - get item by ID, itemId?", itemId);

  return client
    .fetch(
      `*[!(_id in path('drafts.**'))][_type == "items" && _id == "${itemId}"]{
      ${simpleContentProjection}}`
    )
    .then((data) => {
      console.log("data check1 - res?", data);

      const item = data[0];
      if (!item.image) {
        return item;
      } else {
        return { ...item, image: urlFor(item.image) };
      }
    })
    .then((res) => {
      console.log("data check - res?", res);
      return res;
    });
};

export const getItemsByCategory = async (categories: string) => {
  return client.fetch(
    `*[!(_id in path('drafts.**'))][_type == "items" && category.title ==${categories} ]`
  );
};

export const addLikeRequest = async (id: string) => {
  console.log("add like request init");
  try {
    return client
      .patch(id)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit();
  } catch (err) {
    console.error("addlikeRequest error", err);
    throw err;
  }
};
