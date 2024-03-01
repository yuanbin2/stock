import { useParams } from "react-router-dom";
import { Box, GridItem, Heading, Spinner } from "@chakra-ui/react";
import NewsDetail from "../components/NewsDetail";
import useNewsdetail from "../Hooks/useNewsdetail";

const NewsdetailPage = () => {
  const { id } = useParams();
  const { data: news, isLoading, error } = useNewsdetail(id!);
  if (isLoading) return <Spinner />;
  if (error) throw error;
  return (
    <>
      <GridItem area="main">
        {/* <GameGrid /> */}
        <Box padding={5}>
          <NewsDetail news={news} />
        </Box>
      </GridItem>
    </>
  );
};

export default NewsdetailPage;
