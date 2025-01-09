import { App, Modal } from "obsidian";

import { Root, createRoot } from "react-dom/client";
import React from "react";

export class ShortCutsModal extends Modal {

  private colorsShortCuts: Root

	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;

    contentEl.createEl("h2", { text: "Shortcuts" });
    contentEl.createDiv({ text: "Here are the shortcuts you can use:" });

    this.colorsShortCuts = createRoot(contentEl.children[1]);

    this.colorsShortCuts.render(
      <div>
        <h3>Color Shortcuts</h3>
        <ul>
          <li>Ctrl + Shift + C: Open the color picker</li>
          <li>Ctrl + Shift + V: Open the color picker with the last color used</li>
        </ul>
      </div>
    );

	}
}
