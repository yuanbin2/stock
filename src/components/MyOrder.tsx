import React, { useState } from "react";
import { Box, Button, Heading, List, ListItem } from "@chakra-ui/react";
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        My Orders
      </Heading>
      <List spacing={6}>
        {orders.map((order: Order) => (
          <ListItem
            key={order.id}
            border="1px"
            borderColor="gray.200"
            p={3}
            rounded="md"
          >
            <Box>
              <strong>Order ID:</strong> {order.id}
            </Box>
            <Box>
              <strong>Customer:</strong> {order.customer}
            </Box>
            <Box>
              <strong>Placed At:</strong> {order.placed_at}
            </Box>
            <Box>
              <strong>Payment Status:</strong> {order.payment_status}
            </Box>
            <Box>
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
              <Button onClick={() => handlePurchase(order.id)}>Purchase</Button>
              {purchaseStatus[order.id] && <p>{purchaseStatus[order.id]}</p>}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyOrder;
