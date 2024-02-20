import { useEffect, useState } from "react";
import useData from "./useData";

interface Stock {
    name: string;
    latest_price: Float32Array;
    price_change_percentage: Float32Array;
  }
const useStocks = (currentPage: number) => useData<Stock>(`/stocks/?page=${currentPage}`);

export default useStocks;