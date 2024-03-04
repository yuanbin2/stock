import { HStack, Image, Button } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // 清空 access
    localStorage.removeItem("refreshToken"); // 清空 refresh
    localStorage.removeItem("cartId");
    // 进行其他退出操作，如跳转到登录页面等
    window.location.reload();
  };

  return (
    <HStack>
      <Image src={logo} boxSize="60px" />
      <ColorModeSwitch />
      <Button onClick={handleLogout}>退出</Button>
    </HStack>
  );
};

export default NavBar;
