import {PlayerContext} from "@/services/PlayerProvider";
import {useContext} from "react";

export const PlayerIcon = () => {
    const {player: {name, color}} = useContext(PlayerContext);

    return (
        <div style={{color: color}} className="flex gap-1 absolute top-0 right-0 w-40 bg-white bg-opacity-50 p-2 rounded justify-center">
            {name}
        </div>
    )
}