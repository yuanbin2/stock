import { Box, Text, VStack } from "@chakra-ui/react";
import useMyStock from "../Hooks/useUserstock";

const MyStock = () => {
  const { data: userStock, isLoading, isError } = useMyStock();

  if (isLoading) {
    return <Text>Loading user stocks...</Text>;
  }

  if (isError || !userStock) {
    return <Text>Error fetching user stocks.</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      <Box key={userStock.id} borderWidth="1px" borderRadius="md" p={4}>
        <Text fontWeight="bold">User Stock ID: {userStock.id}</Text>
        <Text>Total Price: {userStock.total_price}</Text>
        <VStack spacing={2} align="stretch">
          {userStock.items.map((item) => (
            <Box key={item.id} borderWidth="1px" borderRadius="md" p={2}>
              <Text>Stock ID: {item.id}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Total Price: {item.total_price}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default MyStock;
