import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Stock } from "../Hooks/useStocks";
import axios from "axios";
import useStockHistory, { StockHistory } from "../Hooks/useStockHistory";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StockTrendChart from "./StockTrendChart";
interface Props {
  stock: Stock | undefined;
}

interface Comment {
  id: number;
  customer: number;
  stock: number;
  content: string;
  time: string;
}

const StockDetail = ({ stock }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [commentContent, setCommentContent] = useState<string>("");
  const [stockComments, setStockComments] = useState<Comment[]>();
  const [shouldFetchComments, setShouldFetchComments] = useState(true);
  const {
    data: stockHistory,
    isLoading,
    isError,
  } = useStockHistory(stock?.id || "");

  // 获取股票评论数据
  useEffect(() => {
    if (shouldFetchComments && stock && stock.id) {
      axios
        .get(`http://127.0.0.1:7678/stocks/${stock.id}/comment/`)
        .then((response) => {
          setStockComments(response.data);
          setShouldFetchComments(false); // 获取完数据后将 shouldFetchComments 置为 false
        })
        .catch((error) => {
          console.error("Error fetching stock comments:", error);
        });
    }
  }, [shouldFetchComments, stock?.id]);
  const handleRefreshComments = () => {
    setShouldFetchComments(true); // 设置 shouldFetchComments 为 true，触发重新获取评论数据
    setCommentContent("");
  };

  // 添加到购物车
  const addToCart = () => {
    if (!stock) {
      return;
    }

    setAddToCartLoading(true);

    fetch(
      `http://127.0.0.1:7678/carts/${localStorage.getItem("cartId")}/items/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock_id: stock.id, quantity: quantity }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add item to cart");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Added to cart:", data);
        // 处理添加到购物车成功的逻辑
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        // 处理添加到购物车失败的逻辑
      })
      .finally(() => {
        setAddToCartLoading(false);
      });
  };
  // 添加评论
  const addComment = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `JWT ${localStorage.getItem("accessToken")}`;
    axios
      .post(
        `http://127.0.0.1:7678/stocks/${stock?.id}/comment/`,
        {
          stock: stock?.id,
          content: commentContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Added comment:", response.data);
        // 处理添加评论成功的逻辑
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        // 处理添加评论失败的逻辑
      });
  };

  return (
    <>
      {/* 详情 */}
      <Box p={4} borderWidth="1px" borderRadius="md" shadow="md">
        {stock && (
          <>
            <Heading as="h2" size="lg" mb={4}>
              {stock.name} ({stock.code})
            </Heading>
            <Flex justify="space-between" align="center" mb={4}>
              <Text>昨日收盘价: {stock.yesterday_closing_price}</Text>
              <Text>今日开盘价: {stock.today_opening_price}</Text>
              <Text>最新价格: {stock.latest_price}</Text>
              <Text>价格变动百分比: {stock.price_change_percentage}%</Text>
            </Flex>
          </>
        )}

        {/* 显示股票历史数据 */}
        {isLoading && <Text>Loading...</Text>}
        {isError && <Text>Error fetching stock history data</Text>}
        {/* 显示股票趋势图 */}
        {stockHistory && <StockTrendChart stockHistory={stockHistory} />}
      </Box>

      {/* 添加评论 */}
      <Box p={4} borderWidth="1px" borderRadius="md" shadow="md">
        {/* 添加评论部分 */}
        <Heading as="h2" size="lg" mb={4}>
          Add Comment
        </Heading>
        <Flex justify="space-between" align="center" mb={4}>
          <Input
            placeholder="Enter your comment"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <Button
            colorScheme="teal"
            onClick={() => {
              addComment();
              handleRefreshComments();
            }}
          >
            Add Comment
          </Button>
        </Flex>
      </Box>
      {/* 显示评论 */}
      <Box p={4} borderWidth="1px" borderRadius="md" shadow="md">
        {/* 显示股票评论部分 */}
        <Heading as="h2" size="lg" mb={4}>
          Stock Comments
        </Heading>
        {stockComments?.map((comment) => (
          <Box key={comment.id} p={2} mb={2}>
            <Text>{comment.content}</Text>
            <Text fontSize="sm" color="gray.500">
              {comment.time}
            </Text>
          </Box>
        ))}
      </Box>
      {/* 添加到购物车 */}
      <Box p={4} borderWidth="1px" borderRadius="md" shadow="md">
        <Heading as="h2" size="lg" mb={4}>
          Add Stock to Cart
        </Heading>
        <Flex justify="space-between" align="center" mb={4}>
          <Text>Quantity:</Text>
          <Input
            type="number"
            value={quantity.toString()} // 将 quantity 转换为字符串进行显示
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))} // 将输入值转换为数字类型
          />
        </Flex>
        <Button
          colorScheme="blue"
          onClick={addToCart}
          isLoading={addToCartLoading}
        >
          Add to Cart
        </Button>
      </Box>
    </>
  );
};

export default StockDetail;
