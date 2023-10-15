import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function MenuPage() {
  return (
    <div className="h-screen w-full">
      <Header />
      <div className="h-[70%] flex flex-col justify-center items-center">
        <div className="text-[#1CB722] font-bold text-[25px]">
          2023, The currently stored items are...
        </div>
        <div className="mt-12">
          <Link href={`/mrc`}>
            <Image
              src={"/mrc_menu.png"}
              width={300}
              height={300}
              alt="mrc menu"
            />
          </Link>
          <div className="mt-4">
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
