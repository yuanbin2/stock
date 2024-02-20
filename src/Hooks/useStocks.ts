import { useQuery } from '@tanstack/react-query';
import useData, { FetchResponse } from "./useData";
import apiClient2 from '../services/api-client2';

interface Stock {
    name: string;
    latest_price: Float32Array;
    price_change_percentage: Float32Array;
  }
const useStocks = (currentPage: number)=>
useQuery<FetchResponse<Stock>, Error>({
  queryKey: ['stocks'],
  queryFn: () =>
    apiClient2
      .get<FetchResponse<Stock>>(`/stocks/?page=${currentPage}`)
      .then((res) => res.data),
  staleTime: 3 * 60 * 1000, // 3min
});
export default useStocks;