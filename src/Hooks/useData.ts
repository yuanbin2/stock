import { useEffect, useState } from "react";
import apiClient2 from "../services/api-client2";
import { CanceledError } from "axios";

interface FetchResponse<T> {
    count: number;
    results: T[];
}

const useData = <T>(endpoint: string) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [total_count, setTotal_count] = useState(1);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        apiClient2
          .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
          .then((res) => {
            setData(res.data.results);
            setTotal_count(res.data.count);
          })
          .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)
            setLoading(false);
          });
          return () => controller.abort();
      }, [endpoint]);
    return {error, data, total_count, isLoading}
}

export default useData;