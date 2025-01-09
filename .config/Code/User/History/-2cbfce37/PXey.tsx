import * as React from "react";
import { ExtentedApp } from "../main";

type ShortCutsComponentProps = {
  app: ExtentedApp;
  close: () => void;
};

const ShortCutsComponent = ({app , close} : ShortCutsComponentProps) => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle the keyboard event here
      console.log("Key pressed:", event.key);

      if (event.key === '1') {
        close();

        // add delay to ensure the modal is closed before executing the command
        setTimeout(() => {
          console.log("Executing command");
          app.commands.executeCommandById("color-#ff0000");
        }, 1000);        

        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      console.log("Removing event listener");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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