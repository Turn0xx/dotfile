import { App, Modal } from "obsidian";

import { Root, createRoot } from "react-dom/client";

export class ShortCutsModal extends Modal {

  private colorsShortCuts: Root

	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;

    contentEl.createEl("h2", { text: "Shortcuts" });
    contentEl.createDiv({ text: "Here are the shortcuts you can use:" });

    this.colorsShortCuts = createRoot

	}
}
