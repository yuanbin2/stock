import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client2";

export interface SimpleStock{
    id: number;
    name: string;
    latest_price: Float32Array;
}
export interface UserstockItem {
    id: number;
    stock: SimpleStock;
    quantity: number;
    total_price: Float32Array;
}

export interface Userstock{
    id: number;
    items: UserstockItem[];
    total_price: number;
}
const apiClient = new APIClient<Userstock>('/customers/me/userstock');

const useMyStock = ()=>
  useQuery<Userstock[]>({
    queryKey: ['userstocks'],
    queryFn: () =>
        apiClient.getItems(),
    staleTime: 3 * 60 * 1000, // 3min
    keepPreviousData: true
  });
export default useMyStock;