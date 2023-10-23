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
"others" [],
`;

export const getAllRecentItems = async (place: string) => {
  return client
    .fetch(
      `*[!(_id in path('drafts.**'))][_type == "items" && place._ref in *[_type == "place" && key == "${place}"]._id]{
        "likes" : coalesce(likes, 0),
        "id" : _id,
        "image" : photo,
        title,
        "createdAt": _createdAt,
        "categoryKey" : category->key,
      }|order(createdAt desc)`
    )
    .then((data) => {
      const res = data.map((item: any) => {
        if (!item.image) {
          return item;
        } else {
          return { ...item, image: urlFor(item.image) };
        }
      });
      return res;
    });
};

export const getAllPopularItems = async (place: string) => {
  return client
    .fetch(
      `*[!(_id in path('drafts.**'))][_type == "items" && place._ref in *[_type == "place" && key == "${place}"]._id]{
        "likes" : coalesce(likes, 0),
        "id" : _id,
        "image" : photo,
        title,
        "createdAt": _createdAt,
        "categoryKey" : category->key,
      }|order(likes desc)`
    )
    .then((data) => {
      const res = data.map((item: any) => {
        if (!item.image) {
          return item;
        } else {
          return { ...item, image: urlFor(item.image) };
        }
      });
      return res;
    });
};

export const getItemById = async (itemId: string, categoryKey: string) => {
  return client
    .fetch(
      `*[!(_id in path('drafts.**'))][_type == "items" && _id == "${itemId}"]{
        "id" : _id,
        "image" : photo,
        title,
        "likes" : coalesce(likes, 0),
        "category" : category->title,
        "categoryKey" : category->key,
        "createdAt": _createdAt,
        "author": category->author,
        "description": category->description,
        "trait": category->trait,
        "about": place->about,
        "place": place->title,
        "placeKey": place->key,
        "other": *[_type == "items" && category._ref in *[_type =="categories" && key == "${categoryKey}"]._id]{
          title,
          "image" : photo,
          "id" : _id,
          "categoryKey": category->key,
        },
        }`
    )
    .then((data) => {
      const item = data[0];
      if (!item.image) {
        return item;
      } else {
        const newOther = item.other.map((i: any) => {
          return { ...i, image: urlFor(i.image) };
        });
        return { ...item, image: urlFor(item.image), other: newOther };
      }
    })
    .then((res) => {
      return res;
    });
};

export const getItemsByCategory = async (categoryKey: string) => {
  return client.fetch(
    `*[!(_id in path('drafts.**'))][_type == "items" && category.key ==${categoryKey} ]`
  );
};

export const addLikeRequest = async (id: string) => {
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
