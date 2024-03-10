import { useState } from "react";
import {
  Button,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Input,
} from "@chakra-ui/react";

import useStocks from "../Hooks/useStocks";
import { Link } from "react-router-dom";

const StockList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { error, data } = useStocks(currentPage, searchTerm);
  const total_count = data?.count;
  let page_num = 0;
  //计算总页数
  if (total_count !== undefined) {
    page_num = Math.ceil(total_count / 10);
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    // setCurrentPage(1); // 重置当前页数为第一页
  };

  if (error) return <Text>{error.message}</Text>;
  else
    return (
      <>
        <Input
          placeholder="Search stock..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>股票名称</Th>
              <Th>价格升降</Th>
              <Th>最新价格</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.results.map((stock) => (
              <Tr key={stock.name}>
                <Td>
                  <Link to={"/" + stock.id}>{stock.name}</Link>
                </Td>
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
        <Text display="inline-block" marginX="2">
          Page {currentPage} of {page_num}
        </Text>
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
