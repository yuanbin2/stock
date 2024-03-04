import { GridItem, Box } from "@chakra-ui/react";
import MyCart from "../components/MyCart";

const MycartPage = () => {
  return (
    <GridItem area="main">
      {/* <GameGrid /> */}
      <Box padding={5}>
        <MyCart />
      </Box>
    </GridItem>
  );
};

export default MycartPage;
