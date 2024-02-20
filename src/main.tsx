import React from "react";
import ReactDOM from "react-dom/client";

import {
  ChakraProvider,
  ColorModeProvider,
  ColorModeScript,
} from "@chakra-ui/react";
import theme from "./theme";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {/* <QueryClientProvider client={queryCilent}> */}
      <App />
      {/* <ReactQueryDevtools /> */}
      {/* </QueryClientProvider> */}
    </ChakraProvider>
  </React.StrictMode>
);
