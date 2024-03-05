import { useEffect, useState } from "react";
import useCart from "../Hooks/useCart";
import { Box, Button, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import useGetCartItems from "../Hooks/useGetCartItems";

const MyCart = () => {
  const { data } = useCart();
  const { error, data: cartItem, refetch } = useGetCartItems(); // 使用 refetch 来重新获取数据

  const handleDelete = (itemId: number) => {
    fetch(
      `http://127.0.0.1:4985/carts/${localStorage.getItem(
        "cartId"
      )}/items/${itemId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          // 调用 refetch 来重新获取数据
          refetch();
        } else {
          console.error("Failed to delete item");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (data && data.id) {
      localStorage.setItem("cartId", data.id); // 将 data 中的 id 放入本地存储的 cartId 中
    }
  }, [data]);
  if (error) return null;

  return (
    <>
      <div>
        <Heading>{localStorage.getItem("cartId")}</Heading>
      </div>
      <Box p={4} shadow="md" borderWidth="1px">
        <Text fontSize="xl">Stocks:</Text>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={4}
        >
          {cartItem?.map((stock) => (
            <GridItem key={stock.id}>
              <Box mt={4} p={4} borderWidth="1px">
                <Text fontSize="md">Stock Name: {stock.stock.name}</Text>
                <Text fontSize="md">
                  Latest Price: {stock.stock.latest_price}
                </Text>
                <Text fontSize="md">Quantity: {stock.quantity}</Text>
                <Text fontSize="md">Total Price: {stock.total_price}</Text>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(stock.id)}
                >
                  Delete
                </Button>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default MyCart;
