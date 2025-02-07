import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {WebsocketHistoryContext} from "@/services/WebsocketHistoryProvider";

export const GameContext = createContext(null);
export const GameProvider = ({children}) => {
    const {websocketHistory} = useContext(WebsocketHistoryContext);

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

    const findLastByType = (TYPE) => websocketHistory[TYPE];

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
    }, websocketHistory['game_created'] || websocketHistory['move']);

    return (
        <GameContext.Provider value={{game, setGameState}}>
            {children}
        </GameContext.Provider>
    );
}
