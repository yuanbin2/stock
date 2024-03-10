import { Box, Text, VStack, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyStock, { UserstockItem } from "../Hooks/useUserstock";

const MyStock = () => {
  const { data: userStock, isLoading, isError, refetch } = useMyStock();
  const [sellingStock, setSellingStock] = useState<UserstockItem | null>(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // 监听 cartItem 的变化，并重新获取数据
    if (userStock) {
      refetch();
    }
  }, [userStock]);

  const handleSellStock = async (stockId: number, quantity: number) => {
    try {
      // 在这里定义你的请求头
      const headers = {
        Authorization: `JWT ${localStorage.getItem("accessToken")}`, // 假设你需要一个认证令牌
        "Content-Type": "application/json", // 设置内容类型为 JSON
        // 可以根据需要添加更多的头部信息
      };

      await axios.post(
        `http://127.0.0.1:8826/customers/me/userstock/sell_stock/`,
        {
          stock_id: stockId,
          quantity: quantity,
        },
        { headers: headers } // 将 headers 对象作为配置传递给 Axios 请求
      );

      // 成功卖出股票后，调用refetch刷新数据
      refetch();
    } catch (error) {
      console.error("Error selling stock:", error);
    }
  };

  if (!userStock || userStock.items.length === 0) {
    return <Text>暂未购买任何股票</Text>;
  }

  if (isLoading) {
    return <Text>Loading user stocks...</Text>;
  }

  if (isError || !userStock) {
    return <Text>Error fetching user stocks.</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      {userStock.items.map((item) => (
        <Box key={item.id} borderWidth="1px" borderRadius="md" p={4}>
          <Text fontWeight="bold">User Stock ID: {userStock.id}</Text>
          <Text>Total Price: {userStock.total_price}</Text>
          <VStack spacing={2} align="stretch">
            <Text>Stock ID: {item.stock.id}</Text>
            <Text>Stock name: {item.stock.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Total Price: {item.total_price}</Text>
            <Button onClick={() => setSellingStock(item)}>卖出股票</Button>
            {sellingStock && sellingStock.id === item.id && (
              <>
                <input
                  type="number"
                  placeholder="输入卖出数量"
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                />
                <Button
                  onClick={() => handleSellStock(item.stock.id, quantity)}
                >
                  确认卖出
                </Button>
              </>
            )}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default MyStock;
