import ContentList from "@/components/ContentList";
import Header from "@/components/Header";
import Image from "next/image";

export default function MRCPage() {
  return (
    <main className="flex flex-col items-center h-screen px-4">
      <Header />
      <div className="flex flex-col items-center w-[80%]  mx-4 my-4">
        <div className="font-bold text-[44px] title">
          M.R.C
          {/* <Image
            src={"/logo_mrc.png"}
            width={100}
            height={100}
            alt="mrc logo"
          /> */}
        </div>
      </div>
      <ContentList place={"mrc"} />
    </main>
  );
}
