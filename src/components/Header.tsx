import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full mx-4 py-4">
      <Link href={"/"} className="h-[45px] w-[36px] bg-green-200">
        logo
      </Link>
    </div>
  );
}
