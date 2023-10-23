import { client } from "./sanity";

export async function getRecentAllAudio() {
  return client.fetch(`
  *[!(_id in path('drafts.**'))][_type == "audio"]{
    "id" : _id,
    "likes" : coalesce(likes, 0),
    audio,
    title,
    "createdAt": _createdAt,
    "placeKey" : place->key,
  }|order(createdAt desc)`);
}

export async function getPopularAllAudio() {
  return client.fetch(
    `*[!(_id in path('drafts.**'))][_type == "audio"]{
      "id" : _id,
      "likes" : coalesce(likes, 0),
      audio,
      title,
      "createdAt": _createdAt,
      "placeKey" : place->key,
    }|order(likes desc)`
  );
}

export async function getAuidoById(id: string) {
  return client.fetch(
    `*[!(_id in path('drafts.**'))][_type == "audio" && _id == "${id}"][0]{
      "id" : _id,
      author,
      "likes" : coalesce(likes, 0),
      "audio": audio {
        asset-> {
          _ref,
          url
        }
      },
      title,
      description,
      "createdAt": _createdAt,
      "placeKey" : place->key,
      "about" : place->about,
    }`
  );
}
