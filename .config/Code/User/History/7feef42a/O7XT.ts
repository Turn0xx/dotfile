import { Setting, TextAreaComponent } from "obsidian";
import { ColorManager } from "./core/color-managing/color-manager";
import { Color } from "./core/color-managing/color.value-object";
export class TextAreaSetting {
	private lastValidValue: string = "";

	constructor(private colorManager: ColorManager) {}

	public async configure(
		TextComponent: TextAreaComponent,
		displaySetting: Setting
	): Promise<void> {
		TextComponent.setPlaceholder(
			"Enter colors here: red;green;#ff0000;#00ff00"
		);
		this.colorManager.loadColors().then((settings) => {
			TextComponent.setValue(this.colorsToTextArea(settings));
		});

		TextComponent.onChange(async () => {
			const trimmedValue = TextComponent.getValue().trim();
			if (trimmedValue === this.lastValidValue) {
				this.success(displaySetting);
				return;
			}

			if (!this.isValidTextAreaValue(trimmedValue)) {
				this.error(displaySetting);
				return;
			}
			this.success(displaySetting);
			this.lastValidValue = trimmedValue;
			this.saveColors(trimmedValue);
		});
	}

	private saveColors(value: string) {
		value.split(";").map((color) => {
			if (color === "") return;

			this.colorManager.addColor(Color.from(color));
		});
	}

	private colorsToTextArea(colors: Color[]): string {
		return colors.map((color) => color.unpack()).join(";");
	}

	private isValidTextAreaValue(value: string): boolean {
		return value.split(";").every((color) => {
			if (color === "") return true;
			return Color.isColor(color);
		});
	}

	private error(displaySetting: Setting) {
		displaySetting.components.forEach((component: any) => {
			(component as { inputEl: HTMLElement }).inputEl.style.borderColor =
				"red";
		});
	}

	private success(displaySetting: Setting) {
		displaySetting.components.forEach((component: any) => {
			(component as { inputEl: HTMLElement }).inputEl.style.borderColor =
				"green";
		});
	}

  private removeDoublon(value: string): string {
    return [...new Set(value.split(";"))].join(";");
  }
}