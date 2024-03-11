import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Bar,
} from "recharts";
import { StockHistory } from "../Hooks/useStockHistory";

const StockTrendChart = ({
  stockHistory,
}: {
  stockHistory: StockHistory[];
}) => {
  const [data, setData] = useState(stockHistory);

  // 模拟定时更新数据
  useEffect(() => {
    const interval = setInterval(() => {
      // 在这里可以获取最新的股票数据，并更新 data 状态
      // 例如：fetchLatestStockData().then(newData => setData(newData));
    }, 60000); // 每分钟更新一次

    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="closing_price_adjusted"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="highest_price"
          stroke="#ff433b"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="lowest_price"
          stroke="#286c34"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockTrendChart;
