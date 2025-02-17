import {useContext, useEffect, useState} from "react";
import {GameContext} from "@/services/GameProvider";
import '@styles/superTicTacToe.css';
import {PlayerContext} from "@/services/PlayerProvider";
import {useSendWebsocketMessage} from "@/services/SendWebsocketMessage";
import {WebsocketContext} from "@/services/WebsocketProvider";

const SuperTicTacToeComponent = () => {
    const {player} = useContext(PlayerContext);
    const {game} = useContext(GameContext);
    const {state = [], winner, gameId, activePlayer, playersInRoom} = game || {};
    const {webSocket} = useContext(WebsocketContext);

    const [activePlayerObj, setActivePlayer] = useState({});

    useEffect(() => {
        setActivePlayer(playersInRoom.find((player) => player.id === activePlayer));
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
                    <div className="" key={rowIndex}>
                        {row.map((col, colIndex) => {
                            const id = `${colIndex}_${rowIndex}`;

                            return (
                                <div key={id} id={id}
                                     data-symbol={col}
                                     className="cell min-w-48 min-h-48 place-content-center text-center duration-500 border border-blue-100 cursor-pointer hover:border-blue-400 hover:backdrop-blur hover:bg-blue-400">
                                    {col}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        )
    }

    const winScreen = (text) => <div
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 backdrop-blur">
        <div className="absolute animate-pulse top-1/2 left-1/2 bg-white text-black text-4xl font-bold p-4 rounded">
            {text}
        </div>
    </div>;

    return (
        <>
            {winner && winner !== 'draw' && winScreen(`${activePlayerObj.name} won!`)}
            {winner && winner === 'draw' && winScreen('döntetlen')}
            {!winner &&
                <div className="board_container">
                    {gameId}
                    <div className="text-2xl font-bold text-center mb-2 border-b-4" style={{
                        color: activePlayerObj.color,
                        borderColor: 'initial'
                    }}>
                        {player.id === activePlayer ? 'Te következel!' : 'Az ellenfél jön!'}
                    </div>
                    {game && <Cells/>}
                </div>
            }
        </>
    )
}

export default SuperTicTacToeComponent;
