import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import StockList from "../components/StockList";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
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
        <GridItem area="aside">Aside</GridItem>
      </Show>
      <Outlet />
    </Grid>
  );
}

export default App;
