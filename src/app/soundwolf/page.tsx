import ContentList from "@/components/ContentList";
import Header from "@/components/Header";

export default function SoundwolfPage() {
  return (
    <main className="flex flex-col mx-4 items-center h-screen">
      <Header />
      <div className="flex flex-col items-center w-[80%]">
        <div className="font-bold text-[44px]">Soundwolf</div>
      </div>
      <ContentList place="soundwolf" />
    </main>
  );
}
