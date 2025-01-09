/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {EditorPosition, Hotkey, MarkdownView, Notice, Setting } from "obsidian";
import AutoColorPlugin from "src/plugin/main";
import { findSequenceFromCursor, getWorldFromFont, verifyColor } from "./helpers";


export function unColor(plugin : AutoColorPlugin): void {
    const leaf = plugin.app.workspace.getActiveViewOfType(MarkdownView);
    if (!leaf) return
    const editor = leaf.editor;
    const cursor = editor.getCursor();
    const token = editor.getSelection();
    if (!token){
        const commandValidator : EditorPosition = {line: cursor.line , ch: cursor.ch - 1};
        editor.setSelection(cursor , commandValidator);
        if (!editor.getSelection()) return;
        
        if (editor.getSelection() !== '>'){
            console.error('Error : \'>\' not found');
            return;
        } 
        const currentLine : string = editor.getLine(cursor.line);
        const fontRegex : RegExp = new RegExp('<font style="color:.*">.*</font>');
        const match : RegExpMatchArray | null = findSequenceFromCursor(currentLine , fontRegex , cursor , 5);
        if (!match) return;
        const coloredWord = getWorldFromFont(match[0]);
        if (!coloredWord) return;
        const word = coloredWord[0].substring(1 , coloredWord[0].length - 1);
        const newLine = currentLine.replace(match[0] , word);
        const offset = currentLine.length - newLine.length;
        editor.setLine(cursor.line , newLine);
        editor.setCursor(cursor.line , cursor.ch - offset);
    }
}
