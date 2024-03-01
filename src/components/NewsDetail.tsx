import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { News } from "../Hooks/useNews";

const formatTime = (time: string) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

interface Props {
  news: News | undefined;
}

const NewsDetail = ({ news }: Props) => {
  if (!news) return null;

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" shadow="md">
      <Heading as="h2" size="lg" mb={4}>
        {news.title}
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={2}>
        时间: {formatTime(news.time)}
      </Text>
      <Text>{news.content}</Text>
    </Box>
  );
};

export default NewsDetail;
