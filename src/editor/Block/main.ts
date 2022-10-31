import { BlockDefinition, BlockNode, BlockNodes, NodeDefintion } from "../Libraries/lib";
import { Editor } from "../main";
import { isMobile } from "../Mobile/check";
import { getTouchesCount, getTouchPosition, isTouchOverRect } from "../Mobile/position";
import { Position2D } from "../Position/2D";
import { cursorPosition, isCursorOverRect } from "../Utils/cursor";
import { Token } from "../Utils/token";
import blockCSS from './blockCSS';

const style: HTMLStyleElement = document.createElement('style');
style.innerHTML = blockCSS;
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

    __reRender() { // it's just and event, don't call it on your own
        this.DOM.innerHTML = this.render();
    }

    __onAdded(editor: Editor) { // it's just and event, don't call it on your own
        if(this.editor) throw new Error('Attempt to add block to two editors at once');

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
                ${type == 'input' && node.type == 'check' ? '<input type="checkbox" checked class="__block__checkbox"/>' : ''}
                ${(type == 'input' && node.type != 'check') && ball || ''}
                ${(type == 'input' && node.inputText) ? `<input placeholder="${node.inputText.placeholder}" class="__block__inputText" value="${node.inputText.default}">` :node.name}
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
        let motionStart: HTMLCode = '<div class="__block__motion __motion__start"><div class="__motion__icon"></div> Motion</div>';
        let motionNext: HTMLCode = '<div class="__block__motion __motion__next">Motion <div class="__motion__icon"></div></div>';

        return (
            `<div class="__block__header">
                ${definition?.name || `${this.type}`}
            </div>
            <div class="__block__motions">
                ${definition?.motionStart ? motionStart : ''}
                ${definition?.motionNext ? motionNext : ''}
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
        let overRect: (rect: DOMRect, tocuh: number) => boolean = (isMobile() && getTouchesCount() == 1) ? isTouchOverRect : isCursorOverRect;
        let header: DOMRect | null | undefined = document.querySelector(`#block-${this.token} .__block__header`)?.getBoundingClientRect();
        let body: DOMRect | null | undefined = document.querySelector(`#block-${this.token}`)?.getBoundingClientRect();
        let motionStart: DOMRect | null | undefined = document.querySelector(`#block-${this.token} .__block__motions .__motion__start .__motion__icon:after`)?.getBoundingClientRect();

        if(motionStart && overRect(motionStart, 0)) return 'motionStart';
        if(header && overRect(header, 0)) return 'header';
        if(body && overRect(body, 0)) return 'body';

        return false;
    }
}