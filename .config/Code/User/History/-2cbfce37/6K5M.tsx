import * as React from "react";
import { ExtentedApp } from "../main";
import { ObsidianColorManager } from "../core/color-managing/color-manager.obsidian";
import { Color } from "../core/color.value-object";

type ShortCutsComponentProps = {
  app: ExtentedApp;
  close: () => void;
  handleKeyDown: (event: KeyboardEvent) => void;
};

const ShortCutsComponent = ({handleKeyDown} : ShortCutsComponentProps) => {

  const [colors, setColors] = React.useState<Color[]>([]);

  const colorManager = ObsidianColorManager.getInstance();
  const color = colorManager.loadColors().then((colors) => {
    return colors;
  });



  document.addEventListener("keydown", handleKeyDown);
  


  return (
    <div>
      <h3>Color Shortcuts</h3>
      <ul>
        {colors.map((c , index) => (
          <li style key={index}>{c.unpack()}</li>
        ))} 
      </ul>
    </div>
  );
};


export default ShortCutsComponent;