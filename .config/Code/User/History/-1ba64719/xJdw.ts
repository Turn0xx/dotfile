import { Plugin } from "obsidian";
import { ColorManager } from "./color-manager";
import { Color } from "./color.value-object";

type RawData = {
  _color: string;
}

export class ObsidianColorManager implements ColorManager {
	private static instance: ObsidianColorManager;

	public static getInstance(plugin: Plugin): ObsidianColorManager {
		if (!ObsidianColorManager.instance) {
			ObsidianColorManager.instance = new ObsidianColorManager(plugin);
		}
		return ObsidianColorManager.instance;
	}

	private colors: Color[] = [];

	private constructor(private plugin: Plugin) {}

	async loadColors(): Promise<Color[]> {
		await this.loadSettings();

    console.log(this.colors);

		return this.colors;
	}

	public addColor(color: Color): void {
		if (this.colors.find((c) => c.equals(color))) {
			return;
		}
		this.colors.push(color);

    console.log(this.colors);

		this.saveSettings()
			.then(() => console.log(`Color ${color.unpack()} added`))
			.catch((e) => console.error(e));
	}
	public removeColor(color: Color): Promise<void> {
		throw new Error("Method not implemented.");
	}

	public async saveSettings(): Promise<void> {
		await this.plugin.saveData(this.colors);
	}

	public async loadSettings(): Promise<void> {
    const rawData: RawData[] = await this.plugin.loadData();

    if (!rawData) return;

    this.colors = rawData.map((data) => Color.from(data._color));
	}
}