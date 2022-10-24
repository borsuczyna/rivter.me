import Color from "../Color/color";
import { Editor, EditorExtension } from "../main";

export interface BackgroundColors {
    background: Color;
    grid: Color;
};

export class Background extends EditorExtension {
    private __color: BackgroundColors;

    constructor() {
        super();

        this.__color = {
            background: Color.fromHSL(0, 0, 20),
            grid: new Color()
        }
    }

    private updateColors(editor: Editor | undefined = undefined) {
        if(!editor) {
            this.editors.forEach((editor: Editor) => {
                if(!editor.DOM.blockDiv) return;
                editor.DOM.blockDiv.style.backgroundColor = this.__color.background.hsla;
            });

            return;
        }

        if(!editor.DOM.blockDiv) throw new Error('Attempt to update colors before initializing DOM element');
        editor.DOM.blockDiv.style.backgroundColor = this.__color.background.hsla;
    }

    initialize = function(editor: Editor) {
        if(!editor.DOM.blockDiv) throw new Error('Attempt to init background before initializing DOM element');

        this.updateColors(editor);
    };

    set color(colors: BackgroundColors) {
        this.__color = colors;
    }
    
    get color(): any {
        let __this = this;

        return {
            set background(color: Color) {
                __this.__color.background = color;
                __this.updateColors();
            },

            set grid(color: Color) {
                __this.__color.grid = color;
            }
        }
    }
}