import React, { useState } from "react";
import {
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import useStocks from "../Hooks/useStocks";

const StockList = () => {
  const [currentPage, setCurrentPage] = useState(50);
  const { error, data, total_count } = useStocks(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) return <Text color="red">{error}</Text>;
  return (
    <>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price Change Percentage</Th>
            <Th>Latest Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((stock) => (
            <Tr key={stock.name}>
              <Td>{stock.name}</Td>
              <Td>{stock.price_change_percentage}</Td>
              <Td>{stock.latest_price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Previous
      </Button>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === total_count / 10}
      >
        Next
      </Button>
    </>
  );
};

export default StockList;
