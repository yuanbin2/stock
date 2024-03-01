import { useState } from "react";
import {
  Button,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useNews from "../Hooks/useNews";
import { Link } from "react-router-dom";

const formatTime = (time: string) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { error, data } = useNews(currentPage);

  const total_count = data?.count;
  let page_num = 0;
  // 计算总页数
  if (total_count !== undefined) {
    page_num = Math.ceil(total_count / 10);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) return <Text>{error.message}</Text>;
  else
    return (
      <>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>标题</Th>
              <Th>时间</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.results.map((news) => (
              <Tr key={news.id}>
                <Td>
                  <Link to={"/news/" + news.id}>{news.title}</Link>
                </Td>
                <Td>{formatTime(news.time)}</Td>
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

export default NewsList;
