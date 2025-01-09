import { ColorManager } from "./../color-managing/color-manager";
import { ActionType } from "./../../building-blocks/observability/observer";
import { Command, Notice, Plugin } from "obsidian";
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
		ShortCuts.editor = Editor.getInstance();
	}

	update(actionType: ActionType, colorName: string): void {
		if (actionType === "add") {
			this.addCommand(colorName);
		} else if (actionType === "remove") {
			this.removeCommand();
		}
	}

	public addCommand(colorName: string) {
		if (ShortCuts.commands.find((c) => c.id.endsWith(colorName))) {
			// console.log(`Command color-${colorName} already exists`);
			return;
		}

		ShortCuts.commands.push(
			this.plugin.addCommand({
				id: `color-${colorName}`,
				name: `Color ${colorName}`,
				checkCallback: (checking: boolean) => {
					console.log(ShortCuts.commands);
					if (
						ShortCuts.commands.find((c) => c.id.endsWith(colorName))
					) {
						Editor.changeColor(colorName);
						return true;
					}

					new Notice(
						`Color ${colorName} has been deleted - please reload the plugin`
					);
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

		console.log(`Command ${command.id} removed`);
	}

	public configure() {
		ShortCuts.commands.push(
			this.plugin.addCommand({
				id: "uncolore",
				name: "Uncolore - remove color",
				checkCallback: (checking: boolean) => {
					Editor.uncolor();
					return true;
				},
				hotkeys: [{modifiers: ['Mod', 'Shift'], key: '`'}]
			})
		);
	}
}
