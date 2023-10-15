import Header from "@/components/Header";
import Link from "next/link";

export default function Intro() {
  // const [menuModal, setMenuModal] = useState(false);
  return (
    <div className="h-screen w-full">
      <Header />
      <div className="flex flex-col justify-center h-[80%]">
        <div className="w-full flex justify-center itmes-center">
          <Link href={"/menu"} className="w-40 h-40 bg-neutral-600"></Link>
        </div>
      </div>
      {/* {menuModal && (
        <div className="absolute w-[200px] h-[200px] bottom-0 bg-yellow-200"></div>
      )} */}
    </div>
  );
}
