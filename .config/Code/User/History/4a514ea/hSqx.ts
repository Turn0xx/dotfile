import { Color } from "./color.value-object";

export interface ColorManager {
  addColor(color: Color): void;
  removeColor(color: Color): Promise<void>;
  saveSettings(colors: Color[]): Promise<void>;
  loadSettings(): Promise<void>;
  loadColors(): Promise<Color[]>;
}