import { FetchResponse } from "./useData";
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client2";
import { Stock } from "./useStocks";


export interface Customer {
    id: number;
    user_id: number;
    phone: string | null;
    birth_date: string | null;
    membership: string;
    avatar: string;
    account_balance: number;
  }
  
const apiClient = new APIClient<Customer>('/customers/me/');

const useCustomerdetail = ()=>
  useQuery({
    queryKey: ['customer'],
    queryFn: () =>
        apiClient.getData(),
    staleTime: 3 * 60 * 1000, // 3min
    keepPreviousData: true
  });
export default useCustomerdetail;