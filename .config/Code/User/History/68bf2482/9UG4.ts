import { EditorPosition, MarkdownView, Plugin } from "obsidian";
import AutoColorPlugin from "../main";
import { findSequenceFromCursor, getWorldFromFont } from "src/utils/helpers";

export class Editor {
	private static plugin: Plugin;

	private static instance: Editor;

	public static getInstance(plugin: Plugin): Editor {
		if (!Editor.instance) {
			Editor.instance = new Editor(plugin);
		}
		return Editor.instance;
	}

	private constructor(plugin: Plugin) {
		Editor.plugin = plugin;
	}

	static attachPlugin(plugin: Plugin) {
		return Editor.getInstance(plugin);
	}

	public static changeColor(color: string) {
		const leaf =
			this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
		if (!leaf) return;
		const editor = leaf.editor;
		const cursor = editor.getCursor();
		const token = editor.getSelection();
		if (token) {
			const newToken = `<font style="color:${color}">${token}</font>`;
			editor.replaceSelection(newToken);
			cursor.ch = cursor.ch + newToken.length + 1;//todo regler ca
			editor.setCursor(cursor.line, cursor.ch);
		} else {
			const wordAtCursor = editor.wordAt(cursor);
			if (!wordAtCursor) return;
			editor.setSelection(wordAtCursor.from, wordAtCursor.to);
			const token = editor.getSelection();
			if (token) {
				const newToken = `<font style="color:${color}">${token}</font>`;
				editor.replaceSelection(newToken); 
				cursor.ch = wordAtCursor.from.ch + newToken.length + 1;
				editor.setCursor(cursor.line, cursor.ch);
			}
		}
	}

	public static uncolor() {
		const leaf = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
    if (!leaf) return;
    const editor = leaf.editor;
    const cursor = editor.getCursor();
    const currentLine = editor.getLine(cursor.line);

    const fontRegex = /<font style="color:[^>]+>(.*?)<\/font>/g;
    const newLine = currentLine.replace(fontRegex, "$1");

    editor.setLine(cursor.line, newLine);
    editor.setCursor(cursor.line, cursor.ch);
		
	}
}
