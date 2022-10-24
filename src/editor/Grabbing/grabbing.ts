import { Editor, EditorExtension } from "../main";

export class Grabbing extends EditorExtension {
    constructor() {
        super();
    }

    initialize = function(editor: Editor) {
        if(!editor.DOM.blockDiv) throw new Error('Attempt to init grabbing before initializing DOM element');
    };
}