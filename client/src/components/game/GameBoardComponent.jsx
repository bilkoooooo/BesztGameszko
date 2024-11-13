import {useContext, useEffect, useState} from "react";
import {GameContext} from "@/services/GameProvider";
import '@styles/superTicTacToe.css';
import {WebsocketContext} from "@/services/WebsocketProvider";
import {PlayerContext} from "@/services/PlayerProvider";

const GameBoardComponent = () => {
  const {player} = useContext(PlayerContext);
  const {game} = useContext(GameContext);
  const {state, winner, gameId, activePlayer, playersInRoom} = game || {};

  const [activePlayerObj, setActivePlayer] = useState(playersInRoom.find((player) => player.id === activePlayer));

  const {webSocket} = useContext(WebsocketContext);
  const handleClick = ({target}) => {
    if (activePlayer !== player.id) {
      alert('wait your turn');
      return;
    }

    if (target.matches('.cell') && !target.dataset.symbol) {
      webSocket?.send(JSON.stringify({
          playerId: player.id,
          type: 'move',
          cell: target.id
        }
      ));
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

  return (
    <>
      {winner &&
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 backdrop-blur">
          <div className="absolute animate-spin ani top-1/2 left-1/2 bg-white text-black text-4xl font-bold p-4 rounded">
            {activePlayerObj.name} won!
          </div>
        </div>
      }
      {!winner &&
        <div className="board_container">
          {gameId}
          <div
            style={{color: activePlayerObj.color}}>{player.id === activePlayer ? 'Te következel' : 'Az ellenfél jön'}</div>
          Active player: {activePlayerObj.name}
          {game && <Cells/>}
        </div>
      }
    </>
  )
}

export default GameBoardComponent;
