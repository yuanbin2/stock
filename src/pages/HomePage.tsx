import { GridItem, Box } from "@chakra-ui/react";
import StockList from "../components/StockList";

const HomePage = () => {
  return (
    <GridItem area="main">
      {/* <GameGrid /> */}
      <Box padding={5}>
        <StockList />
      </Box>
    </GridItem>
  );
};

export default HomePage;
