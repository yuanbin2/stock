import { useParams } from "react-router-dom";
import useStocksdetail from "../Hooks/useStocksdetail";
import { Box, GridItem, Heading, Spinner } from "@chakra-ui/react";
import StockDetail from "../components/StockDetail";

const StockdetailPage = () => {
  const { id } = useParams();
  const { data: stock, isLoading, error } = useStocksdetail(id!);
  if (isLoading) return <Spinner />;
  if (error) throw error;
  return (
    <>
      <GridItem area="main">
        {/* <GameGrid /> */}
        <Box padding={5}>
          <StockDetail stock={stock} />
        </Box>
      </GridItem>
    </>
  );
};

export default StockdetailPage;
