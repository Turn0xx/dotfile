import { Plugin } from "obsidian";
import { ColorManager } from "./color-manager";
import { Color } from "./color.value-object";

export class ObsidianColorManager implements ColorManager{

  private static instance: ObsidianColorManager;

  public static getInstance(plugin: Plugin): ObsidianColorManager {
    if (!ObsidianColorManager.instance) {
      ObsidianColorManager.instance = new ObsidianColorManager(plugin);
    }
    return ObsidianColorManager.instance;
  }

  private colors: Color[] = [];

	private constructor(private plugin: Plugin) {}

  loadColors(): Promise<Color[]> {
    
  }
  
	public addColor(color: string): Promise<void> {
    throw new Error("Method not implemented.");
	}
	public removeColor(color: string): Promise<void> {
    throw new Error("Method not implemented.");
	}

  public saveSettings(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public loadSettings(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
