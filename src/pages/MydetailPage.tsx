import { GridItem, Box } from "@chakra-ui/react";
import CustomerDetail from "../components/CustomerDetail";

const MydetailPage = () => {
  return (
    <GridItem area="main">
      {/* <GameGrid /> */}
      <Box padding={5}>
        <CustomerDetail />
      </Box>
    </GridItem>
  );
};

export default MydetailPage;
