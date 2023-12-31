import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full pt-4 h-[80px]">
      <Link href={"/"} className="md:h-[80px] h-[60px] aspect-square">
        <Image width={100} height={100} src={"/logo.png"} alt="logo" />
      </Link>
    </div>
  );
}
