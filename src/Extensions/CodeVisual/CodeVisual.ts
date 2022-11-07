import { Editor, EditorExtension } from "../../Editor/main";
import { Block, NodeType } from "../../Editor/Block/main";
import { Nodes } from "../Nodes/nodes";
import { isCursorOverRect } from "../../Editor/Utils/cursor";
import { Color } from "../../final";

export class CodeVisual extends EditorExtension {
    name: string = '@borsuk - Code Visual';
    DOM: HTMLDivElement | undefined;
    DOMVisualizer: HTMLDivElement | undefined;
    code: string = '';

    private editor: Editor | null = null;

    constructor() {
        super();
        
        this.DOMVisualizer = document.createElement('div');
        this.DOMVisualizer.style.setProperty('position', 'absolute');
        this.DOMVisualizer.style.setProperty('border-radius', '50%');
        this.DOMVisualizer.style.setProperty('opacity', '0.2');
    }

    initialize = (editor: Editor) => {
        if(this.editors.length > 1) throw new Error('Code Visual extension can be used only on one editor at once!');
        this.editor = editor;

        this.editor.DOM.div.appendChild(<HTMLDivElement>this.DOMVisualizer);
    };

    setDOM(dom: HTMLDivElement) {
        this.DOM = dom;
    }

    setCode(code: string) {
        if(!this.DOM) return;

        this.DOM.innerHTML = code;
    }

    private setVisualizer(rect: DOMRect, color: Color) {
        if(!this.DOMVisualizer || !this.editor) return;

        this.DOMVisualizer.style.setProperty('left', `${rect.x-1.5*this.editor.zoom}px`);
        this.DOMVisualizer.style.setProperty('top', `${rect.y-2.5*this.editor.zoom}px`);
        this.DOMVisualizer.style.setProperty('width', `${rect.width}px`);
        this.DOMVisualizer.style.setProperty('height', `${rect.height}px`);
        this.DOMVisualizer.style.setProperty('background-color', color.rgb);
    }

    update = () => {
        this.setVisualizer(new DOMRect(0, 0, 0, 0), new Color(0, 0, 0, 0));

        if(!this.editor || !this.DOM || !this.DOMVisualizer) return;
        let nodes: Nodes | null = <Nodes>this.editor.findExtensionByPartialName('Nodes');
        if(!nodes) return;

        let variables: NodeListOf<HTMLDivElement> = this.DOM.querySelectorAll('.__block__variable__definition');
        for(let variable of variables) {
            let rect: DOMRect = variable.getBoundingClientRect();
            if(isCursorOverRect(rect)) {
                let token: string = variable.getAttribute('block') as string;
                let type: NodeType = variable.getAttribute('outputType') as NodeType;
                let id: string = variable.getAttribute('outputId') as string;
                let color: string = variable.getAttribute('color') as string;
                let block: Block | null = this.editor.getBlockByToken(token);

                if(block) {
                    let rect: DOMRect | null = nodes.getNodePosition(block, type, 2, parseInt(id)+1);
                    if(rect) {
                        this.setVisualizer(rect, Color.fromRaw(color));
                    }
                }
            }
        }
    }
}