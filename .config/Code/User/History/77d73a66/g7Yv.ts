export interface ShortCuts extends Observer{
    addCommand(colorName: string): void;
    removeCommand(): void;
}