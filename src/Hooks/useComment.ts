import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client2";

export interface Comment{
    id: number;
    customer: number;
    stock: number;
    content: string;
    time: string;
}

const apiClient = new APIClient<Comment>('/customers/me/comment/');

const useComment = ()=>
  useQuery<Comment[]>({
    queryKey: ['comments'],
    queryFn: () =>
        apiClient.getItems(),
    staleTime: 3 * 60 * 1000, // 3min
    keepPreviousData: true
  });

export default useComment;