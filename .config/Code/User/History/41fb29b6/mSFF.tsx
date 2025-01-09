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

  handleKeyDown = (event: KeyboardEvent) => {
    console.log("Key pressed:", event.key);

    const app = this.app as ExtentedApp;

    if (event.key === '1') {

      this.close();

      // add delay to ensure the modal is closed before executing the command
      setTimeout(() => {
        console.log("Executing command");
        const command = app.commands.findCommand("AutoColor ShortCuts:color-#ff0000");



        console.log("Command found:", command);

        app.commands.executeCommandById(command.id);

        
        
      }, 2000);        

      return;
    }

    if (event.key === '2') {

      this.close();
    }

    if (event.key === '3') {
      event.stopImmediatePropagation();
    }
  };
	onOpen() {



		const { contentEl } = this;

    contentEl.createEl("h2", { text: "Shortcuts" });
    contentEl.createDiv({ text: "Here are the shortcuts you can use:" });

    this.colorsShortCuts = createRoot(contentEl.children[1]);

    this.colorsShortCuts.render(
      <React.StrictMode>
        <div>
          <ShortCutsComponent app={app as ExtentedApp} close={() => this.close()} handleKeyDown={this.handleKeyDown}/>
        </div>
      </React.StrictMode> 
    );
	}


  onClose(): void {
    console.log("Closing Shortcuts Modal");
    document.removeEventListener("keydown", this.handleKeyDown);
    this.colorsShortCuts.unmount();
  }
}
