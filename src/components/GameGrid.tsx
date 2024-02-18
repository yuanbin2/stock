import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import useGames from "../Hooks/useGames";

const GameGrid = () => {
  const { error, games } = useGames();
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
