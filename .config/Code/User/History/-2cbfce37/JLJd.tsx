import * as React from "react";
import { ExtentedApp } from "../main";

type ShortCutsComponentProps = {
  app: ExtentedApp;
  close: () => void;
};

const ShortCutsComponent = ({app , close} : ShortCutsComponentProps) => {

  const [open , setOpen] = React.useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    // Handle the keyboard event here
    console.log("Key pressed:", event.key);

    if (event.key === '1') {
      document.removeEventListener("keydown", handleKeyDown);
      close();

      // add delay to ensure the modal is closed before executing the command
      setTimeout(() => {
        console.log("Executing command");
        const command = app.commands.findCommand("AutoColor ShortCuts:color-#ff0000");



        console.log("Command found:", command);

        app.commands.executeCommandById(command.id);

        
        
      }, 2000);        

      return;
    }
  };

  React.useEffect(() => {
    console.log("Adding event listener");
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      console.log("Removing event listener");
    };
  }, [handleKeyDown]);

  React.useEffect(() => {

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
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