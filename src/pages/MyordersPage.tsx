import { GridItem, Box } from "@chakra-ui/react";
import MyOrder from "../components/MyOrder";

const MyordersPage = () => {
  return (
    <GridItem area="main">
      {/* <GameGrid /> */}
      <Box padding={5}>
        <MyOrder />
      </Box>
    </GridItem>
  );
};

export default MyordersPage;
