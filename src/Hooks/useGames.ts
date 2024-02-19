import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";


export interface Platform{
  id: number;
  name: string;
  slug: string;
}
export interface Game {
    id: Number;
    name: string;
    background_image: string;
    platforms: {platform: Platform}[]
  }
  interface FetchGameResponse {
    count: Number;
    results: Game[];
  }
const useGames = () =>{
  let [games, setGames] = useState<Game[]>([]);
  let [error, setError] = useState("");
  useEffect(() => {
    // 控制取消请求
    const controller = new AbortController();
    apiClient
      .get<FetchGameResponse>("/games", {signal: controller.signal})
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
      });

  }, []);

  return {error, games}
}


export default useGames;