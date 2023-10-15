import { RiHeartLine, RiHeartFill } from "react-icons/ri";

type Props = {
  className?: string;
};

export const icons = {
  HeartIcon: ({ className }: Props) => (
    <RiHeartLine size={32} className={className} />
  ),
  HeartFillIcon: ({ className }: Props) => (
    <RiHeartFill size={32} color={"#FF0000"} className={className} />
  ),
};
