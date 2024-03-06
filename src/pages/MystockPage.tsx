import { GridItem, Box } from "@chakra-ui/react";
import MyStock from "../components/MyStock";

const MystockPage = () => {
  return (
    <GridItem area="main">
      {/* <GameGrid /> */}
      <Box padding={5}>
        <MyStock />
      </Box>
    </GridItem>
  );
};

export default MystockPage;
