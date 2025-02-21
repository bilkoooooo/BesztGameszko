import {createContext, useReducer} from "react";

export const PlayerContext = createContext(null);
export const PlayerProvider = ({children}) => {
  const reducer = (state, {name, value}) => {
      return {
          ...state,
          [name]: value
      }
  }

  const playerObj = localStorage.getItem('player') ?
    JSON.parse(localStorage.getItem('player')) :
    {
      name: 'Teszt Elek_' + Math.floor(Math.random() * 1000),
      color: null,
      id: null
    };

  const [player, dispatch] = useReducer(reducer, playerObj);

  return (
    <PlayerContext.Provider value={{player, dispatch}}>
      {children}
    </PlayerContext.Provider>
  );
}
