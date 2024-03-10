// GlobalProvider.tsx
import React, { ReactNode, useState } from "react";
import GlobalContext, { GlobalState } from "../GlobalContext";

interface Props {
  children: ReactNode;
}

const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    user: "John Doe",
    isAuthenticated: true,
  });

  // 如果需要，可以在这里添加修改globalState的逻辑

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
