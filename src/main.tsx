import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import theme from "./theme";
import "./index.css";
import router from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {/* <QueryClientProvider client={queryCilent}> */}
      {/* <App /> */}
      {/* <ReactQueryDevtools /> */}
      {/* </QueryClientProvider> */}
      <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>
  </React.StrictMode>
);
