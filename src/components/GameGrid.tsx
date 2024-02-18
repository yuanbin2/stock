import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Text } from "@chakra-ui/react";
interface Game {
  id: Number;
  name: String;
}
interface FetchGameResponse {
  count: Number;
  results: Game[];
}

const GameGrid = () => {
  let [games, setGames] = useState<Game[]>([]);
  let [error, setError] = useState("");
  useEffect(() => {
    apiClient
      .get<FetchGameResponse>("/games")
      .then((res) => setGames(res.data.results))
      .catch((err) => setError(err.message));
  });
  return (
    <>
      {/* 错误信息 */}
      {error && <Text>{error}</Text>}
      {/* 游戏列表 */}
      <ul>
        {games.map((game) => (
          <li key={game.id.toString()}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
