import ContentList from "@/components/ContentList";
import Header from "@/components/Header";
import Image from "next/image";

export default function MRCPage() {
  return (
    <main className="flex flex-col mx-4 items-center h-screen">
      <Header />
      <div className="flex flex-col items-center w-[80%]">
        <div className="font-bold text-[44px]">M. R .C</div>
      </div>
      <ContentList place={"mrc"} />
    </main>
  );
}
