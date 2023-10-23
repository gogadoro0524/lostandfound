import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function MenuPage() {
  return (
    <div className="h-screen w-full px-4">
      <Header />
      <div className="h-[70%] flex flex-col justify-center items-center">
        <div className="text-[#1CB722] font-bold md:text-[25px] text-[18px">
          2023, The currently stored items are...
        </div>
        <div className="mt-12 flex flex-col items-center">
          <Link href={`/mrc`}>
            <Image
              src={"/logo_mrc.png"}
              width={80}
              height={50}
              alt="mrc menu"
            />
          </Link>
          <div className="mt-8">
            <Link href={"/soundwolf"}>
              <Image
                src={"/soundwolf_menu.png"}
                width={300}
                height={300}
                alt="soundwolf menu"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
