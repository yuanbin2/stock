import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import useMyOrder, { Order, OrderItem } from "../Hooks/useMyOrder";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";

const MyOrder = () => {
  const { data: orders, isLoading, isError } = useMyOrder();
  const [purchaseStatus, setPurchaseStatus] = useState<{
    [key: number]: string;
  }>({});

  const handlePurchase = async (orderId: number) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `JWT ${localStorage.getItem("accessToken")}`;
    try {
      const response = await axios.get(
        `http://127.0.0.1:7678/orders/${orderId}/purchase/`
      );
      setPurchaseStatus((prevStatus) => ({
        ...prevStatus,
        [orderId]: "购买成功已将此股票列表中股票添加到您的所持股票中",
      }));
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = (error as any).response?.data?.error;
        setPurchaseStatus((prevErrors) => ({
          ...prevErrors,
          [orderId]: errorMessage,
        }));
      } else {
        setPurchaseStatus((prevStatus) => ({
          ...prevStatus,
          [orderId]: "An unknown error occurred",
        }));
      }
    }
  };

  //   处理闭合展开事件
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  const handleToggle = (orderId: string) => {
    if (openOrderId === orderId) {
      setOpenOrderId(null);
    } else {
      setOpenOrderId(orderId);
    }
  };

  if (!orders || orders.length === 0) {
    return <Text>暂无任何订单</Text>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Box p={4}>
      <List spacing={6}>
        {orders.map((order: Order) => (
          <ListItem
            key={order.id}
            border="1px"
            borderColor="gray.200"
            p={3}
            rounded="md"
          >
            <Button onClick={() => handleToggle(order.id.toString())}>
              展开/关闭
            </Button>
            <strong>订单 ID:</strong> {order.id}
            <Collapse in={openOrderId === order.id.toString()} animateOpacity>
              <Box mt={2}>
                <strong>用户 ID:</strong> {order.customer}
                <br />
                <strong>创建时间:</strong>{" "}
                {format(new Date(order.placed_at), "yyyy-MM-dd HH:mm:ss")}
                <br />
                <strong>支付状态:</strong>
                {order.payment_status === "C"
                  ? "已支付"
                  : order.payment_status === "P"
                  ? "未支付"
                  : "支付失败"}
                <br />
                <strong>包含股票条目:</strong>
                <ul>
                  {order.items.map((item: OrderItem, index: number) => (
                    <li key={index}>
                      <strong>条目 ID:</strong> {item.id}
                      <br />
                      <strong>股票 ID:</strong> {item.stock}
                      <br />
                      <strong>数量:</strong> {item.quantity}
                      <br />
                      <strong>单价:</strong> {Number(item.unit_price) * 1.0}
                      <br />
                      <strong>总价:</strong>{" "}
                      {(item.quantity * Number(item.unit_price)).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handlePurchase(order.id)}
                  disabled={order.payment_status === "C"}
                >
                  购买
                </Button>
                {purchaseStatus[order.id] && <p>{purchaseStatus[order.id]}</p>}
              </Box>
            </Collapse>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyOrder;
