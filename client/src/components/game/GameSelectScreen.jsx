import {useContext} from "react";
import {WebsocketHistoryContext} from "@/services/WebsocketHistoryProvider";
import {WebsocketContext} from "@/services/WebsocketProvider";
import {useSendWebsocketMessage} from "@/services/SendWebsocketMessage";
import {PlayerContext} from "@/services/PlayerProvider";

const GameSelectScreen = () => {
    const {websocketHistory} = useContext(WebsocketHistoryContext);
    const {webSocket} = useContext(WebsocketContext);
    const {player} = useContext(PlayerContext);

    const {games = []} = websocketHistory?.available_games?.at(0) || {};

    console.log(games);

    const GamesDiv = (game) => {
        return (
            <h1>{game.name}</h1>
        )
    }

    const handleClickedGame = (gameKey) => {
        const selectedGame = games.find(game => game.key === gameKey);

        useSendWebsocketMessage(webSocket, {player, type: 'vote', game: gameKey});
    }

    return games ? (
        <div className={"flex flex-col gap-5 items-center justify-center"}>
            {games.map((game, index) => <div onClick={handleClickedGame}
                                             className={"p-4 bg-gradient-to-b from-blue-500 to-blue-900 cursor-pointer"}
                                             key={index}>{GamesDiv(game)}</div>)}
        </div>
    ) : null
}

export default GameSelectScreen;