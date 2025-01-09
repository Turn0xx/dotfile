import { App, Modal } from "obsidian";

export class ShortCutsModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;

    contentEl.createEl("h2", { text: "Shortcuts" });
    contentEl.createDiv({ text: "Here are the shortcuts you can use:" });

	}
}
