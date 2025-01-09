import { Color } from "./color.value-object";

export interface ColorManager {
  addColor(color: string): Promise<void>;
  removeColor(color: string): Promise<void>;
  saveSettings(colors: Color[]): Promise<void>;
  loadSettings(): Promise<void>;
  loadColors(): Promise<Color[]>;
}