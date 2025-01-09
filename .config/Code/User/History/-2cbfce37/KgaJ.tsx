import * as React from "react";
import { ExtentedApp } from "../main";

type ShortCutsComponentProps = {
  app: ExtentedApp;
  close: () => void;
};

const ShortCutsComponent = ({app , close} : ShortCutsComponentProps) => {

  const [open , setOpen] = React.useState(false);


  document.addEventListener("keydown", handleKeyDown);
  
    }

    return () => {
      setOpen(false);
    };
  

  }, [open]);

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