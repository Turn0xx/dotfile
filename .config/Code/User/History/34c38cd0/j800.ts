import { Setting } from "obsidian";
import { Observer } from "./building-blocks/observability/observer";
import {
	ObservableAction,
	ActionMap,
} from "./building-blocks/observability/subject";
import { Color } from "./core/color.value-object";

export class ColorPreview implements Observer {
	private colors: Color[] = [];

	update<T extends ObservableAction>(
		actionType: T,
		colorName: ActionMap[T]
	): void {
		throw new Error("Method not implemented.");
	}

	private constructor() {}

	public static fromColors(colors: Color[]): ColorPreview {
		const preview = new ColorPreview();
		preview.colors = colors;
		return preview;
	}

	public render(settings: Setting): void {
		this.colors.map((color) => {
			settings.addColorPicker((colorPicker) => {
				const dco = ColorTranslator.toHEX(color.unpack());
				colorPicker.setValue(dco);
			});
		});
	}
}
