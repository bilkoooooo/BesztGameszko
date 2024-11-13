import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import '@styles/App.scss';
import {MenuStateProvider} from "@/services/MenuStateProvider";
import Main from "@components/Main";

createRoot(document.getElementById("app")).render(
  // <StrictMode>
    <MenuStateProvider>
      <Main/>
    </MenuStateProvider>
  // </StrictMode>
);
