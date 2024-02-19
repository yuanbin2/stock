import {
  FaPlaystation,
  FaWindows,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";

import { Icon, Text } from "@chakra-ui/react";
import { Platform } from "../Hooks/useGames";
import { IconType } from "react-icons";

interface Prop {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms }: Prop) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation5: FaPlaystation,
    "xbox-series-x": FaXbox,
    macos: FaApple,
    linux: FaLinux,
    "nintendo-switch": SiNintendo,
    ios: MdPhoneIphone,
    web: BsGlobe,
    android: FaAndroid,
  };
  return (
    <>
      {platforms.map((platform) => (
        <Icon as={iconMap[platform.slug]}></Icon>
      ))}
    </>
  );
};

export default PlatformIconList;
