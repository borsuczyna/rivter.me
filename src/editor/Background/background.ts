import { Color } from "../Color/color";
import { Editor, EditorExtension } from "../main";

export interface BackgroundColors {
    background: Color;
    grid: Color;
};

const style = document.createElement('style');
style.innerHTML = `
.__editor__background {
    --background: rgb(20, 20, 20);
    --grid: black;
    --grid-size: 1px;
    --board-zoom: 1;

    background: linear-gradient(to bottom, var(--grid) var(--grid-size), transparent var(--grid-size)), linear-gradient(to right, var(--grid) var(--grid-size), transparent var(--grid-size));
    background-color: var(--background);

    background-size: calc(50px * var(--board-zoom)) calc(50px * var(--board-zoom));

    background-position-x: calc(var(--board-width)/2 + calc(var(--board-x) * var(--board-zoom)));
    background-position-y: calc(var(--board-height)/2 + calc(var(--board-y) * var(--board-zoom)));
}
`;
document.getElementsByTagName('head')[0].appendChild(style);

export class Background extends EditorExtension {
    private __color: BackgroundColors = {
        background: new Color(25, 25, 25),
        grid: new Color(20, 20, 20)
    };
    private __gridSize: number = 1;

    constructor() {
        super();
    }

    private updateStyle(editor: Editor | undefined = undefined) {
        let setEditorBackground = (editor: Editor) => {
            if(!editor.DOM.div) return;

            editor.DOM.div.classList.add('__editor__background');
            editor.DOM.div.style.setProperty('--background', this.__color.background.rgb);
            editor.DOM.div.style.setProperty('--grid', this.__color.grid.rgb);
            editor.DOM.div.style.setProperty('--grid-size', `${this.__gridSize}px`);
        }

        this.editors.forEach(setEditorBackground);
        if(!editor || !editor.DOM.div) return;
        setEditorBackground(editor);
    }

    initialize = function(editor: Editor) {
        if(!editor.DOM.blockDiv) throw new Error('Attempt to init background before initializing DOM element');

        this.updateStyle(editor);
    };

    set color(colors: BackgroundColors) {
        this.__color = colors;
    }
    
    get color(): any {
        let __this = this;

        return {
            set background(color: Color) {
                __this.__color.background = color;
                __this.updateStyle();
            },

            set grid(color: Color) {
                __this.__color.grid = color;
                __this.updateStyle();
            }
        }
    }

    set gridSize(size: number) {
        this.__gridSize = size;
        this.updateStyle();
    }

    get gridSize(): number {
        return this.__gridSize;
    }
}