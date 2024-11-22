import GameBoardComponent from "@components/game/GameBoardComponent";
import {useContext} from "react";
import {GameContext} from "@/services/GameProvider";

const GameComponent = () => {
  const {game} = useContext(GameContext);

  return (
    <div className="flex w-full h-full justify-center items-center relative">
      {!game && <div className="loader"/>}
      {game && <GameBoardComponent/>}
    </div>
  )
}

export default GameComponent;
