import * as React from "react";
import { ExtentedApp } from "../main";

type ShortCutsComponentProps = {
  app: ExtentedApp;
  close: () => void;
  handleKeyDown: (event: KeyboardEvent) => void;
};

const ShortCutsComponent = ({handleKeyDown} : ShortCutsComponentProps) => {



  document.addEventListener("keydown", handleKeyDown);
  


  return (
    <div>
      <h3>Color Shortcuts</h3>
      <ul>
        <li>Ctrl + Shift + C: Open the color picker</li>
        <li>Ctrl + Shift + V: Open the color picker with the last color used</li>
      </ul>
    </div>
  );
};


export default ShortCutsComponent;