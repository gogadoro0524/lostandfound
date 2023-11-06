import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function MenuPage() {
  return (
    <div className="h-screen w-full px-4 flex flex-col justify-between">
      <Header />
      <div className="flex flex-col justify-center items-center">
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
      <div className="flex flex-col">
        <p className="text-[10px] flex justify-center font-thin">
          {`Supported by ‘Online Arts Project for Change – Art Change UP’`}
        </p>
        <p className="text-[10px] flex justify-center font-thin">
          {`Arts Council Korea and the Ministry of Culture,`}
        </p>
        <p className="text-[10px] flex justify-center font-thin">
          {`Sports and Tourism Korea Republic of Korea`}
        </p>

        <div className="flex items-center justify-center">
          <div className="aspect-square flex justify-center items-center">
            <Image
              src={"/art1.png"}
              width={120}
              height={120}
              alt="art support"
            ></Image>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src={"/art2.png"}
              width={120}
              height={120}
              alt="art support"
            ></Image>
          </div>
          <div className=" flex justify-center items-center">
            <Image
              src={"/art3.jpeg"}
              width={90}
              height={90}
              alt="art support"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
