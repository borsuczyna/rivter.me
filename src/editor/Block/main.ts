import { BlockDefinition, BlockNode, BlockNodes, NodeDefintion } from "../Libraries/lib";
import { Editor } from "../main";
import { isMobile } from "../Mobile/check";
import { getTouchesCount, getTouchPosition, isTouchOverRect } from "../Mobile/position";
import { Position2D } from "../Position/2D";
import { cursorPosition, isCursorOverRect } from "../Utils/cursor";
import { Token } from "../Utils/token";

const style: HTMLStyleElement = document.createElement('style');
style.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');

.__block__element {
    --position-x: 0px;
    --position-y: 0px;

    text-align: var(--block-text-align);
    position: absolute;
    color: var(--block-text-color);
    font-family: var(--block-font);
    min-width: var(--block-min-width);
    max-width: var(--block-max-width);
    background-color: var(--block-background);
    border-radius: var(--block-radius);
    padding: var(--block-padding);
    border: var(--block-border);
    
    width: max-content;
    // overflow: hidden;

    transform: translate(-50%, -50%) scale(var(--board-zoom));

    left: calc(var(--board-width)/2 + calc(var(--board-x) * var(--board-zoom)) + var(--position-x) * var(--board-zoom));
    top: calc(var(--board-height)/2 + calc(var(--board-y) * var(--board-zoom)) + var(--position-y) * var(--board-zoom));
}

.__block__content {
    display: flex;
}

.__block__inputs {
    flex-grow: 1;
    width: max-content;
    text-align: left;
}

.__block__outputs {
    flex-grow: 1;
    width: max-content;
    text-align: right;
}

.__block__node {
    --node-color: red;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7px;
    min-width: max-content;
    width: max-content;
    flex-grow: 1;
    padding-inline: 5px;
}

.__block__ball {
    width: 12px;
    height: 12px;
    background-color: var(--node-color);
    border-radius: 50%;
}

.__block__input .__block__ball::after {
    transform: translateX(-38px);
}

.__block__output .__block__ball::after {
    transform: translateX(38px);
}

.__block__ball::after {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    background-color: var(--node-color);
    border-radius: 50%;
}

.__block__inputText {
    color: var(--block-input-color);
    background-color: var(--block-input-background);
    border-radius: var(--block-input-border-radius);
    outline: none;
    border: none;
    height: 19px;
    padding: 2px 4px;
}

.__block__header {
    margin-bottom: 5px;
}

.__block__element {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
}
`;
document.getElementsByTagName('head')[0].appendChild(style);

export type HTMLCode = string;

export class Block {
    position: Position2D = new Position2D(0, 0);
    token: string = Token.generate(32);
    type: string;
    DOM: HTMLDivElement;
    editor: Editor;

    constructor(type) {
        this.type = type;

        this.DOM = <HTMLDivElement> document.createElement('div');
        this.DOM.id = `block-${this.token}`;
        this.DOM.innerHTML = this.render();
        this.DOM.classList.add('__block__element');
        
        this.updatePosition();
    }

    reRender() { // it's just and event, don't call it on your own
        this.DOM.innerHTML = this.render();
    }

    onAdded(editor: Editor) { // it's just and event, don't call it on your own
        this.editor = editor;
    }

    updatePosition() {
        this.DOM.style.setProperty('--position-x', `${this.position.x}px`);
        this.DOM.style.setProperty('--position-y', `${this.position.y}px`);
    }

    private renderNode(node: NodeDefintion, type: string): HTMLCode {
        let ball: HTMLCode = `<div class="__block__ball __block__ball__${type}"></div>`;
        let blockNode: BlockNode = this.editor.findNode(node.type);

        return (
            `<div class="__block__node __block__${type}" style="--node-color: ${blockNode.color.rgba}">
                ${type == 'input' && ball || ''}
                ${(type == 'input' && node.inputText) ? `
                
                <input placeholder="${node.inputText.placeholder}" class="__block__inputText" value="${node.inputText.default}">

                ` : node.name}
                ${type == 'output' && ball || ''}
            </div>`
        )
    }

    private renderNodes(nodes: NodeDefintion[], type: 'input' | 'output'): HTMLCode {
        let code: HTMLCode = '';

        nodes?.forEach((node: NodeDefintion) => {
            code += this.renderNode(node, type);
        })

        return code;
    }

    private render(): HTMLCode {
        let definition: BlockDefinition = this.editor?.findDefinition(this.type);
        let inputs: HTMLCode = this.renderNodes(definition?.inputs, 'input');
        let outputs: HTMLCode = this.renderNodes(definition?.outputs, 'output');

        return (
            `<div class="__block__header">
                ${definition?.name || `${this.type}`}
            </div>
            <div class="__block__content">
                <div class="__block__inputs">
                    ${inputs}
                </div>
                <div class="__block__outputs">
                    ${outputs}
                </div>
            </div>`
        )
    }

    isCursorOver(): boolean {
        let rect: DOMRect = this.DOM.getBoundingClientRect();

        return (!isMobile() ? isCursorOverRect(rect) : (getTouchesCount() == 1 && isTouchOverRect(rect, 0)));
    }

    getOverPart(): string | boolean {
        let position: Position2D = (isMobile() && getTouchesCount() == 1) ? getTouchPosition(0) : cursorPosition;
        let header: HTMLDivElement | null = document.querySelector(`#block-${this.token}`);

        console.log(header)

        return false;
    }
}