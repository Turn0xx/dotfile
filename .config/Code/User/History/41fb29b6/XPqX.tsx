import { App, Modal } from "obsidian";

import { Root, createRoot } from "react-dom/client";
import * as React from "react";
import ShortCutsComponent from "./short-cuts";
import { ExtentedApp } from "../main";

export class ShortCutsModal extends Modal {

  private colorsShortCuts: Root

	constructor(app: App) {
		super(app);
	}

	onOpen() {


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

		const { contentEl } = this;

    contentEl.createEl("h2", { text: "Shortcuts" });
    contentEl.createDiv({ text: "Here are the shortcuts you can use:" });

    this.colorsShortCuts = createRoot(contentEl.children[1]);

    this.colorsShortCuts.render(
      <React.StrictMode>
        <div>
          <ShortCutsComponent app={app as ExtentedApp} close={() => this.close()}/>
        </div>
      </React.StrictMode> 
    );
	}


  onClose(): void {
    console.log("Closing Shortcuts Modal");
    document.removeEventListener("keydown", handleKeyDown);
    this.colorsShortCuts.unmount();
  }
}