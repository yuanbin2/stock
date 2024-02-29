import { Box, Text, VStack, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Aside = () => {
  const [selectedLink, setSelectedLink] = useState<string | null>(null);

  const handleSelectLink = (index: string) => {
    setSelectedLink(index);
  };

  const urlMap: { [key: string]: string } = {
    "": "首页",
    mystock: "我的股票",
    myorder: "我的订单",
    mycomment: "我的评论",
    mydetail: "个人信息",
    news: "新闻界面",
  };

  return (
    <Box p={6}>
      <VStack spacing={4} align="stretch">
        {["", "mystock", "myorder", "mycomment", "mydetail", "news"].map(
          (index) => (
            <Link key={index} to={`/${index}`}>
              <Text
                fontSize="lg"
                p={2}
                border="1px solid transparent"
                _hover={{ color: "blue.500", bg: "gray.100" }}
                _focus={{ outline: "none" }}
                bg={selectedLink === index ? "blue.500" : "transparent"}
                color="white"
                onClick={() => handleSelectLink(index)}
              >
                {urlMap[index]}
              </Text>
            </Link>
          )
        )}
      </VStack>
    </Box>
  );
};

export default Aside;
