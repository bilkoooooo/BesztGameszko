import SuperTicTacToeComponent from "@components/game/SuperTicTacToeComponent";
import {useContext} from "react";
import {GameContext} from "@/services/GameProvider";
import GameSelectScreen from "@components/game/GameSelectScreen";
import {WebsocketContext} from "@/services/WebsocketProvider";

const GameComponent = () => {
    const {game} = useContext(GameContext);
    const {webSocket} = useContext(WebsocketContext) || {};

    return (
        <div className="flex w-full h-full justify-center items-center relative">

            {!game && webSocket && <GameSelectScreen/>}
            {/*{!game && <div className="loader"/>}*/}
            {/*{game && <SuperTicTacToeComponent/>}*/}
        </div>
    )
}

export default GameComponent;
