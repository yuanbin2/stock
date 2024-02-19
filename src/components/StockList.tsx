import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useEditableState,
} from "@chakra-ui/react";

interface Stock {
  name: string;
  latest_price: Float32Array;
  price_change_percentage: Float32Array;
}
const StockList = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(50);
  const [total_count, setTotal_count] = useState(1);
  useEffect(() => {
    axios
      .get(`http://8.130.108.45:1001/stocks/?page=${currentPage}`)
      .then((response) => {
        setTotal_count(response.data.count);
        setStocks(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
        setError("Error fetching stock data:" + error);
      });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {error && <Text color="red">{error}</Text>}
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price Change Percentage</Th>
            <Th>Latest Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stocks.map((stock) => (
            <Tr key={stock.name}>
              <Td>{stock.name}</Td>
              <Td>{stock.price_change_percentage}</Td>
              <Td>{stock.latest_price}</Td>
            </Tr>
          ))}
        </Tbody>
        {/* 翻页功能以后实现 */}
        {/* <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>Price Change Percentage</Th>
            <Th>Latest Price</Th>
          </Tr>
        </Tfoot> */}
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
      </Table>
    </>
  );
};

export default StockList;
