import { isMobile } from "../../Editor/Mobile/check";
import { getTouchesCount, isTouchOverRect } from "../../Editor/Mobile/position";
import { isCursorOverRect } from "../../Editor/Utils/cursor";
import { Editor, EditorExtension } from "../../Editor/main";

export class Inputs extends EditorExtension {
    name: string = '@borsuk - Inputs editing';

    constructor() {
        super();
    }

    private clickInput(x, y) {
        let editor = this.editors[0];
        if(!editor) return;

        let overRect: (rect: DOMRect, tocuh: number) => boolean = (isMobile() && getTouchesCount() == 1) ? isTouchOverRect : isCursorOverRect;
        
        for(let block of editor.blocks) {
            let inputs: NodeListOf<HTMLInputElement> = block.DOM.querySelectorAll('input');
            for(let input of inputs) {
                let rect: DOMRect = input.getBoundingClientRect();
                if(overRect(rect, 0)) {
                    input.focus();
                    input.selectionStart = input.selectionStart == 0 ? input.value.length : input.selectionStart;
                }
            }
        }
    }

    initialize = (editor: Editor) => {
        editor.addEventHandler('click', this.clickInput.bind(this));
    }

    update = function(editor: Editor) {
        
    };
}