import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function Intro() {
  // const [menuModal, setMenuModal] = useState(false);
  return (
    <div className="h-screen w-full">
      <Header />
      <div className="flex flex-col justify-center h-[80%]">
        <Link href={"/menu"} className="flex justify-center items-center ">
          <div className="w-[35%] aspect-square flex justify-center items-center">
            <Image src={"/logo.png"} width={400} height={400} alt="logo" />
          </div>
        </Link>
      </div>
      {/* {menuModal && (
        <div className="absolute w-[200px] h-[200px] bottom-0 bg-yellow-200"></div>
      )} */}
    </div>
  );
}
