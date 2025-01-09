import * as React from "react";
import { ExtentedApp } from "../main";
import { ObsidianColorManager } from "../core/color-managing/color-manager.obsidian";

type ShortCutsComponentProps = {
  app: ExtentedApp;
  close: () => void;
  handleKeyDown: (event: KeyboardEvent) => void;
};

const ShortCutsComponent = ({handleKeyDown} : ShortCutsComponentProps) => {


  const colorManager = ObsidianColorManager.getInstance();
  const color = await colorManager.loadColors();



  document.addEventListener("keydown", handleKeyDown);
  


  return (
    <div>
      <h3>Color Shortcuts</h3>
      <ul>
        {color.map((c) => (
          <li key={c.colorName}>{c.colorName}</li>
        ))} 
      </ul>
    </div>
  );
};


export default ShortCutsComponent;