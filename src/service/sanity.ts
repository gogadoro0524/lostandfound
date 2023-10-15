import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_SECRET_TOKEN,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-09-30",
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).width(800).url();
};

export const assetsURL = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25/assets/images/${process.env.SANITY_DATASET}`;
