import {useContext, useState} from "react";
import {WebsocketHistoryContext} from "@/services/WebsocketHistoryProvider";
import {WebsocketContext} from "@/services/WebsocketProvider";
import {useSendWebsocketMessage} from "@/services/SendWebsocketMessage";
import {PlayerContext} from "@/services/PlayerProvider";
import {cn} from "@/lib/utils";

const GameSelectScreen = () => {
    const {websocketHistory} = useContext(WebsocketHistoryContext);
    const {webSocket} = useContext(WebsocketContext);
    const {player} = useContext(PlayerContext);

    const {available_games: games} = websocketHistory;

    const [voted, setVoted] = useState(null);

    const GamesDiv = () => {
        return (
            games.map(({key, name}) => (<div onClick={() => handleClickedGame(key)}
                                             className={cn(
                                                 "p-4 w-full border border-white cursor-pointer font-bold select",
                                                 voted === key && "voted")}
                                             key={key}>
                    <h1>{name}</h1>
                </div>)
            ))
    }

    const handleClickedGame = (gameKey) => {
        if (voted) {
            return;
        }

        const selectedGame = games.find(game => game.key === gameKey);

        setVoted(gameKey);
        useSendWebsocketMessage(webSocket, {player, type: 'vote', game: gameKey});
    }

    return games ? (
        <div
            id="game-select"
            className={cn(
                "p-8 bg-white bg-opacity-25 rounded-lg flex flex-col justify-around items-center h-1/2 w-1/2",
                voted && "disabled",
            )}>

            <div className="animate-pulse text-3xl uppercase">
                voting
            </div>

            <GamesDiv/>

            {voted && <div className="text-2xl text-white flex">Waiting for other players
                <div
                    className="animate-bounce">.
                </div>
            </div>}
        </div>
    ) : null
}

export default GameSelectScreen;