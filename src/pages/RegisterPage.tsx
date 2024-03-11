import React from "react";
import {
  Container,
  Box,
  Heading,
  VStack,
  useColorModeValue,
  Center, // 用于根据当前的颜色模式（深色或浅色）动态更改颜色
} from "@chakra-ui/react";
import Register from "../components/Register";
import background from "../assets/stock-background.jpg";

const RegisterPage = () => {
  // 动态背景和文字颜色，以适应不同的颜色模式
  const bgColor = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Center
      bgImage={`url(${background})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Container
        maxW="lg"
        centerContent
        py={10}
        backgroundColor="rgba(0, 0, 0, 0.7)"
      >
        {" "}
        {/* 增加垂直内边距以增加周围空间 */}
        <Box
          p={8}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="xl" // 使用更大的阴影以增强立体感
          color={color} // 使用动态文字颜色
          w="full" // 宽度占满容器宽度
        >
          <VStack spacing={6} align="stretch">
            {" "}
            {/* 垂直堆叠容器，增加子元素之间的间距，并拉伸以填充父容器 */}
            <Heading as="h1" size="xl" textAlign="center">
              欢迎注册
            </Heading>
            <Register />
          </VStack>
        </Box>
      </Container>
    </Center>
  );
};

export default RegisterPage;
