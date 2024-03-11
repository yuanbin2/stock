import { Box, Text, VStack, Button, Badge } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyStock, { UserstockItem } from "../Hooks/useUserstock";

const MyStock = () => {
  const { data: userStock, isLoading, isError, refetch } = useMyStock();
  const [sellingStock, setSellingStock] = useState<UserstockItem | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [messages, setMessages] = useState<{ [key: number]: string }>({});
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    // 监听 cartItem 的变化，并重新获取数据
    if (userStock) {
      refetch();
    }
  }, [userStock]);

  const handleSellStock = async (stockId: number, quantity: number) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `JWT ${localStorage.getItem("accessToken")}`;
    try {
      // 在成功或失败时，使用股票项目的ID更新相应的消息状态
      const response = await axios.post(
        "http://127.0.0.1:7678/customers/me/userstock/sell_stock/",
        {
          stock_id: stockId,
          quantity: quantity,
        }
      );

      const { message } = response.data;
      setErrors("");
      setMessages((prevMessages) => ({
        ...prevMessages,
        [stockId]: message,
      }));

      // 成功卖出股票后，调用refetch刷新数据
      refetch();
    } catch (error) {
      setMessages("");
      const errorMessage = (error as any).response?.data?.message;
      setErrors((prevErrors) => ({
        ...prevErrors,
        [stockId]: errorMessage,
      }));
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
          <Text>总价: {userStock.total_price}</Text>
          <VStack spacing={2} align="stretch">
            <Text>股票名称: {item.stock.name}</Text>
            <Text>所持数量: {item.quantity}</Text>
            <Text>总价: {item.total_price}</Text>
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
                {errors[item.stock.id] && (
                  <Badge variant="solid" colorScheme="red">
                    {errors[item.stock.id]}
                  </Badge>
                )}
                {messages[item.stock.id] && (
                  <Badge variant="solid" colorScheme="green">
                    {messages[item.stock.id]}
                  </Badge>
                )}
              </>
            )}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default MyStock;
