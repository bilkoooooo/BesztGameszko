import TicTacToeComponent from "@components/game/TicTacToeComponent";
import {useContext} from "react";
import {GameContext} from "@/services/GameProvider";
import GameSelectScreen from "@components/game/GameSelectScreen";
import {WebsocketContext} from "@/services/WebsocketProvider";
import {WebsocketHistoryContext} from "@/services/WebsocketHistoryProvider";

const GameComponent = () => {
    const {game} = useContext(GameContext);
    const {webSocket} = useContext(WebsocketContext) || {};
    const {websocketHistory: {members, available_games}} = useContext(WebsocketHistoryContext);

    const membersCount = Object.keys(members).length;

    return (
        <div className="flex w-full h-full justify-center items-center relative">

            {!game && available_games?.length > 1 && membersCount > 1 && webSocket && <GameSelectScreen/>}
            {!game && membersCount < 2 && <div className="loader"/>}
            {['ttt', 'sttt'].includes(game?.key) && <TicTacToeComponent/>}
        </div>
    )
}

export default GameComponent;
