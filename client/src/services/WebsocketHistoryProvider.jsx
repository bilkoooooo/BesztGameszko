import {createContext, useReducer} from "react";

export const WebsocketHistoryContext = createContext(null);
export const WebsocketHistoryProvider = ({children}) => {
    const reducer = (state, eventData) => {
        const {type, data, timestamp} = eventData;
        if (!state[type]) {
            state[type] = [];
        }

        return {
            ...state,
            [type]: [...state[type], {...data, timestamp}]
        }
    }

    const [websocketHistory, dispatch] = useReducer(reducer, {chat: [], join: []});

    return (
        <WebsocketHistoryContext.Provider value={{websocketHistory, setWebsocketHistory: dispatch}}>
            {children}
        </WebsocketHistoryContext.Provider>
    );
}
