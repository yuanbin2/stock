import { FetchResponse } from "./useData";
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client2";


export interface Cart{
    id: string
}

export interface SimpleStock{
    id: number;
    name: string;
    latest_price: Float32Array;
}

export interface CartItem{
    id: number;
    stock: SimpleStock;
    quantity: number,
    total_price: Float32Array;
}

const carId = localStorage.getItem('cartId');
const apiClient = new APIClient<CartItem>('/carts/' + carId + '/items');

const useGetCartItems = ()=>
  useQuery<CartItem[]>({
    queryKey: ['stockitems'],
    queryFn: () =>
        apiClient.getItems(),
    staleTime: 3 * 60 * 1000, // 3min
    keepPreviousData: true
  });
  
export default useGetCartItems;