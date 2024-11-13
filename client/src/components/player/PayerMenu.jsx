import {useContext, useReducer} from "react";
import Player from "@components/player/Player";
import {MenuStateContext} from "@/services/MenuStateProvider";

export function PayerMenu() {
  const {menuState} = useContext(MenuStateContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'rename':
        console.log(state);
        break;
      case 'colorChange':
        return {
          ...state,
          color: action.value
        }
    }
  }

  const generateColor = () => ('#' + Math.floor(Math.random() * 16777215).toString(16));

  const [player, setPlayer] = useReducer(reducer,
    JSON.parse(localStorage.getItem('player')) ??
    {
      name: 'Player 1',
      color: '#ec1515'
    }
  );

  return (
    <div id="player-menu" className={"flex flex-row gap-5 justify-evenly w-full"}>
      <Player player={player} setPlayer={setPlayer}/>
      {menuState === 'localMenu' && <Player player={{name: 'Player 2', color: generateColor()}}/>}
    </div>
  )
}
