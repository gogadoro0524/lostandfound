import { RiHeartLine, RiHeartFill, RiArrowDownSLine } from "react-icons/ri";
import { FaPlay, FaStop } from "react-icons/fa";

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
  ShortArrowDownIcon: ({ className }: Props) => (
    <RiArrowDownSLine size={32} className={className} />
  ),
  PlayIcon: ({ className }: Props) => (
    <FaPlay size={120} className={className} />
  ),
  StopIcon: ({ className }: Props) => (
    <FaStop size={120} className={className} />
  ),
};
