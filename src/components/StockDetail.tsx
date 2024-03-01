import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Stock } from "../Hooks/useStocks";
// import StockChart from "./StockChart";

interface Props {
  stock: Stock | undefined;
}
const StockDetail = ({ stock }: Props) => {
  if (!stock) return;
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" shadow="md">
      <Heading as="h2" size="lg" mb={4}>
        {stock.name} ({stock.code})
      </Heading>
      <Flex justify="space-between" align="center" mb={4}>
        <Text>昨日收盘价: {stock.yesterday_closing_price}</Text>
        <Text>今日开盘价: {stock.today_opening_price}</Text>
        <Text>最新价格: {stock.latest_price}</Text>
        <Text>价格变动百分比: {stock.price_change_percentage}%</Text>
      </Flex>

      {/* <StockChart stock={stock} /> */}

      {/* 可以根据需要展示更多股票信息 */}
    </Box>
  );
};

export default StockDetail;
