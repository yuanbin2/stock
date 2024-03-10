import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";
import GlobalProvider from "../components/GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "180px 1fr",
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
        <Outlet />
      </Grid>
    </GlobalProvider>
  );
}

export default App;
