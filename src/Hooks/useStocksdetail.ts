import { FetchResponse } from "./useData";
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client2";
import { Stock } from "./useStocks";




const apiClient = new APIClient<Stock>('/stocks');

const useStocksdetail = (id: number | string)=>
  useQuery({
    queryKey: ['stocks', id],
    queryFn: () =>
        apiClient.getDetail(id),
    staleTime: 3 * 60 * 1000, // 3min
    keepPreviousData: true
  });
export default useStocksdetail;