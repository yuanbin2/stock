import { FetchResponse } from "./useData";
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client2";
import { Stock } from "./useStocks";


export interface Cart{
    id: string
}

const apiClient = new APIClient<Cart>('/carts');

const useCart = () => {
    const cartId = localStorage.getItem('cartId'); // 从本地存储中获取 cartId
    
    return useQuery({
      queryKey: ['cart'],
      queryFn: () => {
        if (cartId) {
          return Promise.resolve(cartId); // 如果本地存储中已经有了 cartId，则直接返回它
        } else {
          return apiClient.createData(); // 否则执行 queryFn 来获取新的 cartId
        }
      },
      staleTime: 3 * 60 * 1000, // 3min
      keepPreviousData: true
    });
  };
  
export default useCart;