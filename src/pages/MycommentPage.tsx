import { GridItem, Box } from "@chakra-ui/react";
import MyComment from "../components/MyComment";

const MycommentPage = () => {
  return (
    <GridItem area="main">
      {/* <GameGrid /> */}
      <Box padding={5}>
        <MyComment />
      </Box>
    </GridItem>
  );
};

export default MycommentPage;
