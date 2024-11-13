import {FaCaretLeft} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {Button} from "@/components/ui/button"
import {useContext} from "react";
import {MenuStateContext} from "@/services/MenuStateProvider";

export default function MenuButtons() {
  const {setMenuState} = useContext(MenuStateContext);

  return (
    <div className={"absolute left-0 top-0 text-white"}>
      <Button variant="ghost"
              size="icon"
              title="Back"
              className={"bg-transparent"}
              onClick={() => setMenuState('mainMenu')}>
        <FaCaretLeft/>
      </Button>

      <Button variant="ghost"
              size="icon"
              title="Home"
              className={"bg-transparent"}
              onClick={() => setMenuState('mainMenu')}>
        <FaHome/>
      </Button>
    </div>
  )
}
