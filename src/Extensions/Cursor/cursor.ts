import { Editor, EditorExtension } from "../../Editor/main";

export class Cursor extends EditorExtension {
    name: string = '@borsuk - Cursor';
    private cursor: string;

    constructor() {
        super();
    }

    update = (editor: Editor) => {
        editor.DOM.canvas?.style.setProperty('cursor', this.cursor);

        this.cursor = 'default';
    }

    setCursor(cursor: string): void {
        this.cursor = cursor;
    }
}