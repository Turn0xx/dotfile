import { App, Modal } from "obsidian";

import { Root, createRoot } from "react-dom/client";
import * as React from "react";
import ShortCutsComponent from "./short-cuts";
import { ExtentedApp } from "../main";
import { ObsidianColorManager } from "../core/color-managing/color-manager.obsidian";
import { Color } from "../core/color.value-object";

export class ShortCutsModal extends Modal {
	private colorsShortCuts: Root;
  private colors = [];

	constructor(app: App) {
		super(app);
	}

  private async mapColorsToShortcuts() {
    const colors = await ObsidianColorManager.getInstance().loadColors();
    return colors.map((color , index) => {
      return {
        color: color.unpack(),
        shortcut: index + 1 as unknown as string,
      };
    });
  }

	handleKeyDown = (event: KeyboardEvent) => {
		console.log("Key pressed:", event.key);

		const app = this.app as ExtentedApp;

    const allInternalCommands = this.colo


		if (event.key === "1") {
			this.close();

			event.preventDefault();

			console.log("Executing command");
			const command = app.commands.findCommand(
				"AutoColor ShortCuts:color-#ff0000"
			);
			app.commands.executeCommandById(command.id);

			return;
		}
	};

	async onOpen() {
		const { contentEl } = this;

		contentEl.createEl("h2", { text: "Shortcuts" });
		contentEl.createDiv({ text: "Here are the shortcuts you can use:" });

		this.colorsShortCuts = createRoot(contentEl.children[1]);

    this.colors = await this.mapColorsToShortcuts();

		this.colorsShortCuts.render(
			<React.StrictMode>
				<div>
					<ShortCutsComponent
						handleKeyDown={this.handleKeyDown}
            colors={colors}
					/>
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