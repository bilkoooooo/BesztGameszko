import {useContext} from "react";
import {GameContext} from "@/services/GameProvider";

export const WinningScreenComponent = ({activePlayerObj: {name, color = '#000'}}) => {
    const {game: {winner}} = useContext(GameContext);

    const winScreen = (text, color) => <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 backdrop-blur">
        <div id="winner-title" style={{color: color}}
             className="absolute animate-pulse top-1/2 left-1/2 bg-white text-black text-4xl font-bold p-4 rounded">
            {text}
        </div>
    </div>;

    return (
        <div>
            {winner && winner !== 'draw' && winScreen(`${name} nyert!`, color)}
            {winner && winner === 'draw' && winScreen('Döntetlen!')}
        </div>
    )
}