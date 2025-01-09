import { Subject } from "src/plugin/building-blocks/observability/subject";
import { Color } from "../color.value-object";

export interface ColorManager extends Subject {
  addColor(color: Color): void;
  removeColor(color: Color): void;
  saveSettings(): Promise<void>;
  loadSettings(): Promise<void>;
  loadColors(): Promise<Color[]>;
}