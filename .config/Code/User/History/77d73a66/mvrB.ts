import { Observer } from "src/plugin/building-blocks/observability/observer";

export interface ShortCuts extends Observer{
    addCommand(colorName: string): void;
    removeCommand(): void;
}