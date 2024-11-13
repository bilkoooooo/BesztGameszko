import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {ChatHistoryContext} from "@/services/ChatHistoryProvider";

export const GameContext = createContext(null);
export const GameProvider = ({children}) => {
  const {chatHistory} = useContext(ChatHistoryContext);

  const gameStateReducer = (state, {type, value}) => {
    if (type === 'init') {
      return {...value}
    }

    if (type === 'move') {
      return {
        ...state,
        state: value.state,
        activePlayer: value.activePlayer,
        winner: value.winner
      }
    }
  }

  const [game, setGameState] = useReducer(gameStateReducer, null);

  const findLastByType = (TYPE) => chatHistory.findLast(({type}) => type === TYPE);

  useEffect(() => {
    findLastByType('game_created') && setGameState(
      {
        type: 'init',
        value: findLastByType('game_created').game
      }
    );

    findLastByType('move') && setGameState(
      {
        type: 'move',
        value: findLastByType('move').game
      }
    );
  }, [chatHistory && chatHistory.length]);

  return (
    <GameContext.Provider value={{game, setGameState}}>
      {children}
    </GameContext.Provider>
  );
}
