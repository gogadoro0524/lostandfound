import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-12-02",
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).width(800).url();
};

export const assetsURL = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25/assets/images/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
