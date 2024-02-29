import { Box, Grid, GridItem, Heading, Show, Text } from "@chakra-ui/react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import NavBar from "../components/NavBar";
import Aside from "../components/Aside";

const ErrorPage = () => {
  // const routeError = useRouteError();

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
          <GridItem area="aside">
            <Aside />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box padding={5}>
            <Heading>Not Found</Heading>
            {/* {isRouteErrorResponse(routeError) && routeError.status === 404 ? (
              <Text>Page Not Found</Text>
            ) : (
              <Text>An error occurred</Text>
            )} */}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default ErrorPage;
