export interface SettingManager {
    findSequenceFromCursor(line: string, regex: RegExp, cursor: EditorPosition, step: number): RegExpMatchArray | null;
    getWorldFromFont(font: string): RegExpMatchArray | null;
    verifyColor(color: string): string | undefined;
}