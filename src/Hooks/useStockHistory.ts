import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client2";

export interface StockHistory {
    date: string;
    opening_price: Float32Array;
    closing_price_adjusted: Float32Array;
    highest_price: Float32Array;
    lowest_price: Float32Array;
    volume: number;
}
const apiClient = new APIClient<StockHistory>('stocks');

const useStockHistory = (id: string|number)=>
  useQuery<StockHistory[]>({
    queryKey: ['userstocks', id],
    queryFn: () =>
        apiClient.getHistory(id),
    staleTime: 3 * 60 * 1000, // 3min
    keepPreviousData: true
  });
export default useStockHistory;