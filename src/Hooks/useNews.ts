import { FetchResponse } from "./useData";
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client2";

export interface News{
    id: number;
    title: string;
    content: string;
    time: string;
}

const apiClient = new APIClient<News>('/news')
const useNews = (currentPage: number)=>
  useQuery<FetchResponse<News>, Error>({
    queryKey: ['News', currentPage],
    queryFn: () =>
        apiClient.getPage('?page='+currentPage),
    staleTime: 3 * 60 * 1000, // 3min
    keepPreviousData: true
  });
export default useNews;