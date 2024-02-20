import { Box, Grid, GridItem, Heading, Show, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside"></GridItem>
        </Show>
        <GridItem area="main">
          {/* <GameGrid /> */}
          <Box padding={5}>
            <Heading>Oops</Heading>
            <Text>
              {isRouteErrorResponse(error)
                ? "This page does not exist."
                : "An unexpected error occurred."}
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default ErrorPage;
