import { MarkdownView, Plugin } from "obsidian";

export class Colorizer {
	private static plugin: Plugin;

	private constructor() {}

	static attachPlugin(plugin: Plugin) {
		Colorizer.plugin = plugin;
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
			cursor.ch = cursor.ch + newToken.length + 1; //todo regler ca
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
		const leaf =
			this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
		if (!leaf) return;
		const editor = leaf.editor;
		const cursor = editor.getCursor();
		const currentLine = editor.getLine(cursor.line);

		// RegExp pour identifier les balises <font> avec leur contenu
		const fontRegex = /<font style="color:[^>]+>(.*?)<\/font>/g;
		let closestFontTag = null;
		let shortestDistance = Infinity;

		// Explorer la ligne pour trouver la balise <font> la plus proche
		let match;
		while ((match = fontRegex.exec(currentLine)) !== null) {
			const tagStart = match.index;
			const tagEnd = match.in;
			// Calcul de la distance par rapport au curseur pour trouver la balise la plus proche
			const distance = Math.min(
				Math.abs(cursor.ch - tagStart),
				Math.abs(cursor.ch - tagEnd)
			);

			if (distance < shortestDistance) {
				shortestDistance = distance;
				closestFontTag = match;
			}
		}

		if (!closestFontTag) {
			console.error("No close <font> tag found");
			return;
		}

		// Calcul des indices pour reconstruire correctement la nouvelle ligne
		const startOfTag = closestFontTag.index;
		const endOfTag = fontRegex.lastIndex;
		const contentOfTag = closestFontTag[1];

		// Reconstruire la nouvelle ligne avec la balise <font> retirée
		const newLine =
			currentLine.substring(0, startOfTag) +
			contentOfTag +
			currentLine.substring(endOfTag);
		editor.setLine(cursor.line, newLine);

		// Garder le curseur à la même position relative, ajustée pour les changements de longueur de texte
		let newCursorPos = cursor.ch;
		if (cursor.ch > startOfTag) {
			newCursorPos -= endOfTag - startOfTag - contentOfTag.length;
		}
		editor.setCursor(cursor.line, newCursorPos);
	}
}
