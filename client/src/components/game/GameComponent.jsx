import GameBoardComponent from "@components/game/GameBoardComponent";
import {useContext} from "react";
import {GameContext} from "@/services/GameProvider";

const GameComponent = () => {
  const {game} = useContext(GameContext);

  return (
    <>
      {game && <GameBoardComponent/>}
    </>
  )
}

export default GameComponent;
