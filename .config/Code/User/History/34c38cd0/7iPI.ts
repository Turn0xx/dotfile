import { Setting, TextAreaComponent } from "obsidian";
import { Observer } from "./building-blocks/observability/observer";
import {
	ObservableAction,
	ActionMap,
} from "./building-blocks/observability/subject";
import { Color } from "./core/color.value-object";
import { ColorTranslator } from "colortranslator";

export class ColorPreview implements Observer {
	private colors: Color[] = [];
  private renderer: Setting | null;
  private textAreaComponent: TextArea | null;

	update<T extends ObservableAction>(
		actionType: T,
		colorName: ActionMap[T]
	): void {
    if (actionType === "updated") {
      if (this.renderer == null) throw new Error("No renderer attached to the color preview");
      if (this.textAreaComponent == null) throw new Error("No text area component attached to the color preview");
      this.renderer.clear();

      if ('colors' in colorName) {
        this.colors = colorName.colors;
        this.render(this.renderer!);
      }
    }
	}

	private constructor() {}

	public static fromColors(colors: Color[]): ColorPreview {
		const preview = new ColorPreview();
		preview.colors = colors;
    preview.renderer = null;
		return preview;
	}

	public render(settings: Setting , textAreaComponent?: TextArea): void {
    if (this.renderer == null) this.renderer = settings;
    if (textAreaComponent != null) this.textAreaComponent = textAreaComponent;

		this.colors.map((color , index) => {
			this.renderer!.addColorPicker((colorPicker) => {
				const dco = ColorTranslator.toHEX(color.unpack());
				colorPicker.setValue(dco);
        const defaultValue = dco;
        colorPicker.onChange((value) => {

          const color = Color.from(value);
          this.colors[index] = color;

          this.textAreaComponent.
          
          
        });
			});
		});
	}
}
