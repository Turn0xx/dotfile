import { Setting, TextAreaComponent } from "obsidian";
import { ColorManager } from "./core/color-managing/color-manager";
import { Color } from "./core/color-managing/color.value-object";
export class TextAreaSetting {
	constructor(private colorManager: ColorManager) {}

	public async configure(TextComponent: TextAreaComponent , displaySetting: Setting): Promise<void> {
		TextComponent.setPlaceholder(
			"Enter colors here: red;green;#ff0000;#00ff00"
		);
		this.colorManager.loadColors().then((settings) => {
      TextComponent.setValue(this.colorsToTextArea(settings));
    });

    TextComponent.onChange(async () => {
      console.log(TextComponent.getValue());
      if (!this.isValidTextAreaValue(TextComponent.getValue())) {
        this.error(displaySetting);
      }
      this.success(displaySetting);

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
    document.querySelector(".text-colors-input");
    displaySetting.components.forEach((component) => {
      component.
    });
  }

  private success(displaySetting: Setting) {
    displaySetting.setClass("text-colors-input-success");
  }
}
