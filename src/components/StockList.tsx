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
  const [currentPage, setCurrentPage] = useState(40);
  const { error, data } = useStocks(currentPage);
  const total_count = data?.count;
  let page_num = 0;
  if (total_count !== undefined) {
    page_num = total_count / 10;
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) return <Text color="red">{error.message}</Text>;
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
          {data?.results.map((stock) => (
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
        isDisabled={currentPage >= page_num}
      >
        Next
      </Button>
    </>
  );
};

export default StockList;
