import { FetchResponse } from "./useData";
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client2";

export interface Stock {
    id: number;
    code: string;
    name: string;
    latest_price: Float32Array;
    price_change_percentage: Float32Array;
    yesterday_closing_price: Float32Array;
    today_opening_price: Float32Array;
  }

const apiClient = new APIClient<Stock>('/stocks')
const useStocks = (currentPage: number, search: string | null=null) =>
  useQuery<FetchResponse<Stock>, Error>({
    queryKey: ['stocks', currentPage, search],
    queryFn: () => {
      if (search !== null) {
        return apiClient.getPage(`?page=${currentPage}&search=${search}`);
      } else {
        return apiClient.getPage(`?page=${currentPage}`);
      }
    },
    staleTime: 3 * 60 * 1000, // 3min
    keepPreviousData: true
  });
export default useStocks;