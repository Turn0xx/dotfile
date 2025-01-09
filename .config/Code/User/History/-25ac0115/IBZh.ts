import { ColorManager } from "./../color-managing/color-manager";
import { ActionType } from "./../../building-blocks/observability/observer";
import { Command, Plugin } from "obsidian";
import { ObsidianColorManager } from "../color-managing/color-manager.obsidian";
import { Observer } from "src/plugin/building-blocks/observability/observer";
import { Editor } from "../editor";

export class ShortCuts implements Observer {
	private static commands: Command[] = [];

	private static instance: ShortCuts;
	private static editor: Editor;

	public static getInstance(plugin: Plugin): ShortCuts {
		if (!ShortCuts.instance) {
			ShortCuts.instance = new ShortCuts(plugin);
		}
		return ShortCuts.instance;
	}

	private constructor(private plugin: Plugin) {
		ShortCuts.editor = Editor.attachPlugin(plugin);
	}

	update(actionType: ActionType, colorName: string): void {
		console.log("update", actionType, colorName);
		if (actionType === "add") {
			this.addCommand(colorName);
		} else if (actionType === "remove") {
			this.removeCommand();
		}
	}

	public addCommand(colorName: string) {
		if (ShortCuts.commands.find((c) => c.id === `color-${colorName}`)) {
			console.log(`Command color-${colorName} already exists`);
			return;
		}

		ShortCuts.commands.push(
			this.plugin.addCommand({
				id: `color-${colorName}`,
				name: `Color ${colorName}`,
				checkCallback: (checking: boolean) => {
					if (ShortCuts.commands.find((c) => c.id === `color-${colorName}`)) {
						Editor.changeColor(colorName);
						return true;
					}
				},
			})
		);

		console.log(`Command color-${colorName} added`);
	}

	public removeCommand() {
		const command = ShortCuts.commands.pop();
		if (!command) {
			console.log(`No commands to remove`);
			return;
		}

		// this.plugin.unload();
		this.plugin.load();
		this.plugin.app
		console.log(`Command ${command.id} removed`);
		
	}
}
