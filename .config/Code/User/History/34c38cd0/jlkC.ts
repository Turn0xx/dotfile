import { Setting } from "obsidian";
import { Observer } from "./building-blocks/observability/observer";
import {
	ObservableAction,
	ActionMap,
} from "./building-blocks/observability/subject";
import { Color } from "./core/color.value-object";
import { ColorTranslator } from "colortranslator";

export class ColorPreview implements Observer {
	private colors: Color[] = [];
  private renderer: Setting;  

	update<T extends ObservableAction>(
		actionType: T,
		colorName: ActionMap[T]
	): void {

	}

	private constructor() {}

	public static fromColors(colors: Color[]): ColorPreview {
		const preview = new ColorPreview();
		preview.colors = colors;
		return preview;
	}

	public render(settings: Setting): void {
    this.renderer = settings;
    if (this.renderer == null) 

		this.colors.map((color) => {
			this.renderer.addColorPicker((colorPicker) => {
				const dco = ColorTranslator.toHEX(color.unpack());
				colorPicker.setValue(dco);
			});
		});
	}
}
