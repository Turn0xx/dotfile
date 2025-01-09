export interface ColorManager {
  addColor(color: string): Promise<void>;
  removeColor(color: string): Promise<void>;
  saveSettings(): Promise<void>;
  loadSettings(): Promise<void>;
}