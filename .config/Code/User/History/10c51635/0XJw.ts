import { Setting, TextAreaComponent } from "obsidian";
import { ColorManager } from "./core/color-managing/color-manager";
import { Color } from "./core/color.value-object";
export class TextAreaSetting {
	private lastValidValue: string = "";
	private textAreaRef: TextAreaComponent;

	constructor(private colorManager: ColorManager) {}

	public async configure(
		TextComponent: TextAreaComponent,
		displaySetting: Setting
	): Promise<void> {
		this.textAreaRef = TextComponent;
		this.textAreaRef.setPlaceholder(
			"Enter colors here: red;green;#ff0000;#00ff00"
		);
		this.colorManager.loadColors().then((settings) => {
			this.textAreaRef.setValue(this.colorsToTextArea(settings));
			this.lastValidValue = this.colorsToTextArea(settings);
		});
		this.textAreaRef.onChange(async () => {
			const trimmedValue = this.textAreaRef.getValue().trim();
			if (trimmedValue === this.lastValidValue) {
				this.success(displaySetting);
				return;
			}

			if (!this.isValidTextAreaValue(trimmedValue)) {
				this.error(displaySetting);
				return;
			}
			this.success(displaySetting);
			this.removeDoublon(trimmedValue);
			this.saveColors(trimmedValue);
		});

		this.textAreaRef.registerOptionListener(
			{				
				onClose: (value) => {
					console.log("onClose", value);
					return ''
				},
			},
			"onchange"
		);
	}

	public addToTextArea(color: string) {
		const currentColors = this.textAreaRef.getValue();
		this.textAreaRef.inputEl.innerHTML = currentColors + ";" + color;
		this.textAreaRef.setValue(currentColors + ";" + color);
	}

	private saveColors(newColors: string) {
		const lastColors = this.lastValidValue.split(";");
		const changes = newColors.split(";");

		const added = changes.filter((color) => !lastColors.includes(color));
		const removed = lastColors.filter((color) => !changes.includes(color));

		console.log("Added : ", added);
		console.log("Removed : ", removed);

		added.map((color) => {
			if (color === "") return;
			this.colorManager.addColor(Color.from(color));
		});
		removed.map((color) => {
			if (color === "") return;
			this.colorManager.removeColor(Color.from(color));
		});

		this.lastValidValue = newColors;
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

	private removeDoublon(string: string = this.lastValidValue) {
		const newArea = [...new Set(string.split(";"))].join(";");
		this.textAreaRef.setValue(newArea);
	}
}
