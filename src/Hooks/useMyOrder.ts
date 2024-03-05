import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client2";

export interface OrderItem{
    id: number;
    order: number;
    stock: number;
    quantity: number;
    unit_price: Float32Array;
}
export interface Order{
    id: number;
    customer: number;
    placed_at: string;
    payment_status: string;
    items: OrderItem[];
}

const apiClient = new APIClient<Order>('/orders');

const useMyOrder = ()=>
  useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: () =>
        apiClient.getItems(),
    staleTime: 3 * 60 * 1000, // 3min
    keepPreviousData: true
  });
export default useMyOrder;