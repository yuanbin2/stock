import { FetchResponse } from "./useData";
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client2";
import { News } from "./useNews";

const apiClient = new APIClient<News>('/news');

const useNewsdetail = (id: number | string)=>
  useQuery({
    queryKey: ['news', id],
    queryFn: () =>
        apiClient.getDetail(id),
    staleTime: 3 * 60 * 1000, // 3min
    keepPreviousData: true
  });
export default useNewsdetail;