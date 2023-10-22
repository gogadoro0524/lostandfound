import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function Intro() {
  // const [menuModal, setMenuModal] = useState(false);
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Link
        href={"/menu"}
        className="flex justify-center items-center w-[46%] min-w-[200px]"
      >
        <div className="w-full aspect-square flex justify-center items-center">
          <Image src={"/logo.png"} width={600} height={600} alt="logo" />
        </div>
      </Link>
      {/* {menuModal && (
        <div className="absolute w-[200px] h-[200px] bottom-0 bg-yellow-200"></div>
      )} */}
    </div>
  );
}
