import AudioList from "@/components/AudioList";
import ContentList from "@/components/ContentList";
import Header from "@/components/Header";

export default function SoundwolfPage() {
  return (
    <main className="flex flex-col mx-4 items-center">
      <Header />
      <div className="flex flex-col items-center w-[80%]">
        <div className="font-bold text-[44px] title">Soundwolf</div>
      </div>
      <AudioList place="soundwolf" />
      <div className="h-[80px] w-full"></div>
    </main>
  );
}
