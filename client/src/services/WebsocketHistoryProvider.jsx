import {createContext, useReducer} from "react";

const WEBSOCKETHISROTY_INIT = {
    chat: [],
    join: [],
    game:
        {
            inited: false
        },
    move: [],
    members: {},
    available_games: []
}

export const WebsocketHistoryContext = createContext({});
export const WebsocketHistoryProvider = ({children}) => {
    const reducer = (state, eventData) => {
        const {type, data, timestamp} = eventData;
        if (!state[type]) {
            state[type] = [];
        }

        if (type === 'join') {
            state.members = data.members;
        }

        if (type === 'left') {
            return {
                ...state,
                members: data.members,
                game: null
            }
        }

        if (['game_created', 'move'].includes(type)) {
            return {
                ...state,
                game: {...state.game, ...data.game}
            }
        }

        if (type === 'available_games') {
            return {
                ...state,
                available_games: data.games
            }
        }

        console.log(state);
        return {
            ...state,
            [type]: [...state[type], {...data, timestamp}]
        }
    }

    const [websocketHistory, dispatch] = useReducer(reducer, WEBSOCKETHISROTY_INIT);

    return (
        <WebsocketHistoryContext.Provider value={{websocketHistory, setWebsocketHistory: dispatch}}>
            {children}
        </WebsocketHistoryContext.Provider>
    );
}
