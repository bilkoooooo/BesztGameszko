import {useContext, useEffect, useState} from "react";
import {GameContext} from "@/services/GameProvider";
import '@styles/superTicTacToe.css';
import {PlayerContext} from "@/services/PlayerProvider";
import {useSendWebsocketMessage} from "@/services/SendWebsocketMessage";
import {WebsocketContext} from "@/services/WebsocketProvider";
import {WebsocketHistoryContext} from "@/services/WebsocketHistoryProvider";
import {WinningScreenComponent} from "@components/game/WinningScreenComponent";
import {Circle, X} from "lucide-react";
import {cn, rgbToHex} from "@/lib/utils";

const TicTacToeComponent = () => {
    const {websocketHistory: {members}} = useContext(WebsocketHistoryContext);
    const {player} = useContext(PlayerContext);
    const {game} = useContext(GameContext);
    const {state = [], winner, gameId, activePlayer} = game || {};
    const {webSocket} = useContext(WebsocketContext);

    const [activePlayerObj, setActivePlayer] = useState({});

    useEffect(() => {
        setActivePlayer(members.find(({id}) => id === activePlayer));
    }, [game])

    const handleClick = ({target}) => {
        if (activePlayer !== player.id) {
            alert('wait your turn');
            return;
        }

        if (target.matches('.cell') && !target.dataset.symbol) {
            useSendWebsocketMessage(webSocket, {
                    playerId: player.id,
                    type: 'move',
                    cell: target.id
                }
            );
        }
    }


    const Cells = () => {
        return (
            <div className="grid grid-cols-3" onClick={(event) => handleClick(event)}>
                {state.map((row, rowIndex) => (
                    <div key={rowIndex}>
                        {row.map((symbol, colIndex) => {
                            const id = `${colIndex}_${rowIndex}`;

                            const playerColorHex = symbol ? rgbToHex(members.find((member) => member.symbol === symbol).color) : '#fff';
                            console.log(members.find((member) => member.symbol === symbol));

                            const svgClass = cn('w-full h-full');
                            return (
                                <div key={id}
                                     id={id}
                                     data-symbol={symbol}
                                     className={cn("cell min-w-48 min-h-48 place-content-center text-center duration-500 border border-blue-100 cursor-pointer hover:border-blue-400 hover:backdrop-blur hover:bg-blue-400")}
                                    style={{color: playerColorHex}}
                                >
                                    {symbol === 'x' ? <X className={svgClass}/> : ''}
                                    {symbol === 'o' ? <Circle className={svgClass}/> : ''}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        )
    }

    const Title = () => <span style={{
        color: activePlayerObj?.color,
        borderColor: 'initial'
    }}>{player.id === activePlayer ? 'Te következel!' : 'Az ellenfél jön!'}</span>

    return (
        <>
            <WinningScreenComponent activePlayerObj={activePlayerObj}/>
            <div className="board_container bg-gray-600 bg-opacity-25 p-8 rounded-lg">
                {gameId}
                <div className="text-2xl font-bold text-center mb-2 border-b-4 bg-white bg-opacity-50">
                    <Title/>
                </div>
                <Cells/>
            </div>

        </>
    )
}

export default TicTacToeComponent;
