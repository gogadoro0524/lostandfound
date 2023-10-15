"use client";

import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        // 어디 경로로 갈것인지 받아오면
        fetcher: (url: string) =>
          fetch(url).then((res) => {
            console.log("use swr");
            return res.json();
          }),
      }}
    >
      {children}
    </SWRConfig>
  );
}
