import { useEffect, useState } from "react";
import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../Hooks/useGames";
import GameCard from "./GameCard";

const GameGrid = () => {
  const { error, games } = useGames();
  return (
    <>
      {/* 错误信息 */}
      {error && <Text>{error}</Text>}
      {/* 游戏列表 */}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={10}
      >
        {games.map((game) => (
          <GameCard game={game} key={game.id.toString()}></GameCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
