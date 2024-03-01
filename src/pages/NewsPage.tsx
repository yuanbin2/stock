import { GridItem, Box } from "@chakra-ui/react";
import NewsList from "../components/NewsList";

const NewsPage = () => {
  return (
    <GridItem area="main">
      {/* <GameGrid /> */}
      <Box padding={5}>
        <NewsList />
      </Box>
    </GridItem>
  );
};

export default NewsPage;
