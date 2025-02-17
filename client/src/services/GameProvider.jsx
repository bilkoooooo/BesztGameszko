import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {WebsocketHistoryContext} from "@/services/WebsocketHistoryProvider";

export const GameContext = createContext(null);
export const GameProvider = ({children}) => {
    const {websocketHistory} = useContext(WebsocketHistoryContext);

    const gameStateReducer = (state, {value}) => {
        return {
            ...state, ...value
        }
    }

    useEffect(() => {
        const {game: gameWs} = websocketHistory;

        if (gameWs.inited) {
            setGameState({value: gameWs});
        }
    }, [websocketHistory]);

    const [game, setGameState] = useReducer(gameStateReducer, null);

    return (
        <GameContext.Provider value={{game, setGameState}}>
            {children}
        </GameContext.Provider>
    );
}
