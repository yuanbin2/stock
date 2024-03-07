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

const MyOrder = () => {
  const { data: orders, isLoading, isError } = useMyOrder();
  const [purchaseStatus, setPurchaseStatus] = useState<{
    [key: number]: string;
  }>({});

  const handlePurchase = async (orderId: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4985/orders/${orderId}/purchase/`
      );
      setPurchaseStatus((prevStatus) => ({
        ...prevStatus,
        [orderId]: "Purchase successful",
      }));
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        setPurchaseStatus((prevStatus) => ({
          ...prevStatus,
          [orderId]: (error as AxiosError).message,
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
              Toggle
            </Button>
            <strong>Order ID:</strong> {order.id}
            <Collapse in={openOrderId === order.id.toString()} animateOpacity>
              <Box mt={2}>
                <strong>Customer:</strong> {order.customer}
                <br />
                <strong>Placed At:</strong> {order.placed_at}
                <br />
                <strong>Payment Status:</strong> {order.payment_status}
                <br />
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item: OrderItem, index: number) => (
                    <li key={index}>
                      <strong>Item ID:</strong> {item.id}
                      <br />
                      <strong>Order ID:</strong> {item.order}
                      <br />
                      <strong>Stock:</strong> {item.stock}
                      <br />
                      <strong>Quantity:</strong> {item.quantity}
                      <br />
                      <strong>Unit Price:</strong> {item.unit_price}
                    </li>
                  ))}
                </ul>
                <Button onClick={() => handlePurchase(order.id)}>
                  Purchase
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
