import {createContext, useState} from "react";

export const MenuStateContext = createContext(null);

export const MenuStateProvider = ({children}) => {
  const [menuState, setMenuState] = useState('mainMenu');

  return (
    <MenuStateContext.Provider value={{menuState, setMenuState}}>
      {children}
    </MenuStateContext.Provider>
  );
}
