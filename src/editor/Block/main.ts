import { BlockDefinition, BlockNode, BlockNodes, BlockType, NodeDefintion } from "../Libraries/lib";
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

export type NodeType = 'motion-start' | 'motion-next' | 'input' | 'output';
export type HTMLCode = string;
export interface NodeConnection {
    block: Block;
    type: NodeType;
    startID?: number;
    targetID?: number;
};

export class Block {
    position: Position2D = new Position2D(0, 0);
    token: string = Token.generate(32);
    type: BlockType;
    DOM: HTMLDivElement;
    editor: Editor;
    connections: NodeConnection[] = [];
    values: string[] = [];

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

    private renderNode(node: NodeDefintion, type: string, index: number = 0): HTMLCode {
        let ball: HTMLCode = `<div class="__block__ball __block__ball__${type}"></div>`;
        let blockNode: BlockNode = this.editor.findNode(node.type);

        return (
            `<div class="__block__node __block__${type}" style="--node-color: ${blockNode.color.rgba}">
                ${type == 'input' && node.type == 'check' ? '<input type="checkbox" checked class="__block__checkbox"/>' : ''}
                ${(type == 'input' && node.type != 'check') && ball || ''}
                ${(type == 'input' && node.inputText) ? `<input placeholder="${node.inputText.placeholder}" class="__block__inputText" value="${node.inputText.default}" id="inputText-${index}">` :node.name}
                ${type == 'output' && ball || ''}
            </div>`
        )
    }

    private renderNodes(nodes: NodeDefintion[], type: 'input' | 'output'): HTMLCode {
        let code: HTMLCode = '';

        let index = 0;
        nodes?.forEach((node: NodeDefintion) => {
            code += this.renderNode(node, type, index++);
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
        let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(`#block-${this.token} input`);
        
        let index: number = 0;
        for(let input of inputs) {
            let rect: DOMRect = input.getBoundingClientRect();
            if(overRect(rect, 0)) {
                return `input${index}`;
            }
            index++;
        }

        if(motionStart && overRect(motionStart, 0)) return 'motionStart';
        if(header && overRect(header, 0)) return 'header';
        if(body && overRect(body, 0)) return 'body';

        return false;
    }

    isOnScreen(): boolean {
        let rect: DOMRect | null = this.DOM.getBoundingClientRect();
        let editorRect: DOMRect | null = this.editor?.DOM.div?.getBoundingClientRect();
        if(!rect || !editorRect) return false;

        rect.x -= rect.width*0.2;
        rect.y -= rect.height*0.2;
        rect.width *= 1.4;
        rect.height *= 1.4;

        return (
            rect.x + rect.width >= editorRect.x &&
            rect.y + rect.height >= editorRect.y &&
            rect.x <= editorRect.x + editorRect.width &&
            rect.y <= editorRect.y + editorRect.height
        );
    }

    findConnection(type: NodeType, id?: number): NodeConnection | null {
        if(type == 'motion-next' || type == 'motion-start') {
            return this.connections.filter((connection: NodeConnection): boolean => {
                return connection.type == type;
            })[0];
        } else {
            return this.connections.filter((connection: NodeConnection): boolean => {
                return connection.type == type && connection.startID == id;
            })[0];
        }
    }

    removeConnection(type: NodeType, id?: number) {
        if(type == 'motion-start' || type == 'motion-next') {
            this.connections = this.connections.filter((connection: NodeConnection): boolean => {
                return !(connection.type == type);
            });
        } else {
            this.connections = this.connections.filter((connection: NodeConnection): boolean => {
                return !(connection.type == type && connection.startID == id);
            });
        }

        if(this.editor) this.editor.triggerEvent('removed-node-connection');
    }

    removeTargetConnection(type: NodeType, startID: number, targetBlock: Block, targetID: number) {
        this.connections = this.connections.filter((connection: NodeConnection): boolean => {
            return !(connection.type == type && connection.startID == startID && connection.block == targetBlock && connection.targetID == targetID);
        });

        if(this.editor) this.editor.triggerEvent('removed-node-connection');
    }

    findTargetConnection(block: Block, type: NodeType, id?: number): NodeConnection | null {
        if(type == 'motion-next' || type == 'motion-start') {
            return this.connections.filter((connection: NodeConnection): boolean => {
                return (
                    connection.block == block &&
                    (connection.type == 'motion-next' ? 'motion-start' : 'motion-next') == type
                );
            })[0];
        } else {
            return this.connections.filter((connection: NodeConnection): boolean => {
                return (
                    connection.block == block &&
                    (connection.type == 'input' ? 'output' : 'input') == type &&
                    connection.targetID == id
                );
            })[0];
        }
    }

    createConnection(block: Block, type: NodeType, startID?: number, targetID?: number) {        
        if(type == 'motion-next' || type == 'motion-start') {
            let connection: NodeConnection | null = this.findConnection(type);
            if(connection) {
                connection.block.removeConnection(type == 'motion-start' ? 'motion-next' : 'motion-start');
                this.removeConnection(type);
            }

            this.connections.push({
                block: block,
                type: type
            });

            block.connections.push({
                block: this,
                type: type == 'motion-start' ? 'motion-next' : 'motion-start'
            });
        } else {
            let targetConnection: NodeConnection | null = block.findConnection(type, targetID);

            if(targetConnection && targetConnection.type == 'input') {
                console.log(targetConnection)
                targetConnection.block.removeConnection('output', targetConnection.targetID);
                block.removeConnection('input', targetConnection.startID);
            }

            let connection: NodeConnection | null = this.findConnection(type == 'input' ? 'output' : 'input', startID);
            if(connection) {
                console.log(connection)
                if(connection.type == 'input') {
                    connection.block.removeConnection(type, connection.targetID);
                    this.removeConnection(type == 'input' ? 'output' : 'input', startID);
                }
            } else if(type == 'input') {
                connection = block.findConnection('input', startID);
                if(connection) {
                    let connection2: NodeConnection | null = connection.block.findConnection('output', connection.targetID);
                    if(connection2) {
                        connection2.block.removeConnection('input', connection2.targetID);
                        connection.block.removeConnection('output', connection.targetID);
                    }
                }
            }

            this.connections.push({
                block: block,
                type: type == 'input' ? 'output' : 'input',
                startID: startID,
                targetID: targetID
            });

            block.connections.push({
                block: this,
                type: type,
                startID: targetID,
                targetID: startID
            });
        }

        if(this.editor) this.editor.triggerEvent('new-node-connection');
    }
}