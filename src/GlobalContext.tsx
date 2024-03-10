import React from "react";

export interface GlobalState {
  user: string;
  isAuthenticated: boolean;
  // 可以根据需要添加更多的全局状态属性
}

// 定义初始状态或默认值
const defaultState: GlobalState = {
  user: "Guest",
  isAuthenticated: false,
};

const GlobalContext = React.createContext<GlobalState>(defaultState);
export default GlobalContext;
