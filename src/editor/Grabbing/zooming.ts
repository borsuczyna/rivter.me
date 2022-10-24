import { Editor, EditorExtension } from "../main";
import { isCursorOverRect } from "../Utils/cursor";

export class Zooming extends EditorExtension {
    constructor() {
        super();
    }

    min: number | undefined;
    max: number | undefined;

    private handleScroll(event: WheelEvent) {
        const overAny = this.editors.some((editor: Editor) => {
            if(!editor.DOM.blockDiv) return;
            let rect: DOMRect = editor.DOM.blockDiv.getBoundingClientRect();
            return isCursorOverRect(rect);
        });

        this.editors.forEach((editor: Editor) => {
            if(!overAny) return;

            editor.zoom -= event.deltaY/1000;
            editor.zoom = Math.max(Math.min(editor.zoom, this.max || 5), this.min || 0.1);
            editor.updatePosition();
        });
    }

    initialize = function(editor: Editor) {
        if(!editor.DOM.blockDiv) throw new Error('Attempt to init zooming before initializing DOM element');

        addEventListener('wheel', this.handleScroll.bind(this));
    };
}